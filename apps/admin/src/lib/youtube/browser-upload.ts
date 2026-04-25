/**
 * Client-side YouTube upload driver.
 *
 * Flow:
 *   1. POST /api/youtube/upload/init
 *        → inserts `videos` row (status=uploading)
 *        → mints a YouTube resumable upload session URL (Origin pinned to
 *          the browser's, so cross-origin PUT passes preflight)
 *        → returns { videoId, youtubeUploadUrl }
 *   2. PUT <youtubeUploadUrl> with the file bytes (browser → YouTube,
 *      direct, no Vercel or Supabase Storage in the path).
 *      YouTube responds with a JSON body containing the video resource;
 *      we read its `id`.
 *   3. POST /api/youtube/upload/complete { videoId, youtubeVideoId }
 *        → server enriches with thumbnail/duration, marks ready
 *
 * On any failure, POST /api/youtube/upload/fail so the DB row doesn't
 * sit in 'uploading' forever.
 */

export interface UploadCallbacks {
  onProgress?: (pct: number) => void;
}

export interface UploadParams {
  siteId: string;
  file: File;
  title: string;
  description?: string;
  privacyStatus?: 'private' | 'unlisted' | 'public';
}

export interface UploadResult {
  videoId: string;
  youtubeVideoId: string;
  thumbnailUrl: string | null;
}

export class YoutubeNotConnectedError extends Error {
  constructor(message?: string) {
    super(message ?? 'YouTube channel not connected');
    this.name = 'YoutubeNotConnectedError';
  }
}

export async function uploadVideoToYoutube(
  params: UploadParams,
  callbacks: UploadCallbacks = {}
): Promise<UploadResult> {
  // 1. Init — create the videos row and get a YouTube resumable session URL.
  const initRes = await fetch('/api/youtube/upload/init', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      siteId: params.siteId,
      title: params.title,
      description: params.description,
      fileSize: params.file.size,
      mimeType: params.file.type || 'video/*',
      privacyStatus: params.privacyStatus ?? 'unlisted',
      originalFilename: params.file.name,
    }),
  });

  if (initRes.status === 412) {
    const body = (await initRes.json().catch(() => null)) as { message?: string } | null;
    throw new YoutubeNotConnectedError(body?.message);
  }
  if (!initRes.ok) {
    const text = await initRes.text().catch(() => '');
    throw new Error(`init failed: ${text || initRes.status}`);
  }
  const { videoId, youtubeUploadUrl } = (await initRes.json()) as {
    videoId: string;
    youtubeUploadUrl: string;
  };

  // 2. PUT bytes directly to YouTube. Almost all wall-clock time is here
  //    — we report 0–98% of progress to the caller so the final 2% covers
  //    the /complete call.
  let youtubeVideoId: string;
  try {
    youtubeVideoId = await putToYoutube(
      youtubeUploadUrl,
      params.file,
      params.file.type || 'video/*',
      (pct) => callbacks.onProgress?.(Math.round(pct * 0.98))
    );
  } catch (e) {
    await reportFail(videoId, `youtube put: ${(e as Error).message}`);
    throw e;
  }

  // 3. Tell the server to enrich the row.
  callbacks.onProgress?.(99);
  const completeRes = await fetch('/api/youtube/upload/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoId, youtubeVideoId }),
  });
  if (!completeRes.ok) {
    const text = await completeRes.text().catch(() => '');
    await reportFail(videoId, `complete: ${text || completeRes.status}`);
    throw new Error(`Finalize failed: ${text || completeRes.status}`);
  }
  const done = (await completeRes.json()) as {
    youtubeVideoId: string;
    thumbnailUrl: string | null;
  };
  callbacks.onProgress?.(100);
  return { videoId, youtubeVideoId: done.youtubeVideoId, thumbnailUrl: done.thumbnailUrl };
}

function reportFail(videoId: string, errorMessage: string): Promise<unknown> {
  return fetch('/api/youtube/upload/fail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoId, errorMessage }),
    keepalive: true,
  }).catch(() => {});
}

/**
 * PUT the whole file in a single shot to YouTube's resumable session URL.
 *
 * We don't bother with chunked resume on partial failures: if the upload
 * dies mid-way, the user can just re-upload (the file is in their browser,
 * not on a server). Single-shot keeps the code simple and matches what
 * Supabase's own resumable client does for sub-100GB files.
 *
 * On success YouTube returns 200/201 with a JSON body containing the
 * video resource — we parse it to pluck out `id` (the YouTube video id).
 */
function putToYoutube(
  uploadUrl: string,
  file: File,
  contentType: string,
  onProgress?: (pct: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', contentType);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const json = JSON.parse(xhr.responseText);
          if (typeof json?.id === 'string') resolve(json.id);
          else reject(new Error('YouTube response missing id'));
        } catch {
          reject(new Error('YouTube response not JSON'));
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('[youtube upload] PUT failed', xhr.status, xhr.responseText);
        reject(new Error(`YouTube PUT ${xhr.status}: ${xhr.responseText.slice(0, 500)}`));
      }
    };
    xhr.onerror = () => {
      // eslint-disable-next-line no-console
      console.error('[youtube upload] network error');
      reject(new Error('Network error uploading to YouTube'));
    };
    xhr.onabort = () => reject(new Error('Upload aborted'));

    xhr.send(file);
  });
}
