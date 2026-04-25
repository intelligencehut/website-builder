/**
 * Client-side YouTube upload driver.
 *
 * Flow (works around Vercel's 4.5 MB request body cap):
 *   1. POST /api/youtube/upload/init
 *        → inserts `videos` row (status=uploading)
 *        → returns a Supabase Storage signed upload URL
 *   2. PUT <storageSignedUrl> with the file bytes
 *        → browser uploads directly to Storage, no server in the path
 *   3. POST /api/youtube/upload/from-storage { videoId }
 *        → server fetches from Storage, streams to YouTube resumable upload
 *        → updates DB row with youtube_video_id, deletes the staging file
 *
 * On any failure, POST /api/youtube/upload/fail so the DB row doesn't sit
 * in 'uploading' forever.
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
  // 1. Init — get storage signed URL.
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
  const { videoId, storageSignedUrl } = (await initRes.json()) as {
    videoId: string;
    storageSignedUrl: string;
  };

  // 2. PUT to Supabase Storage with progress (most of the time is here —
  //    up to 90% of total as reported to callbacks.onProgress).
  try {
    await putWithProgress(storageSignedUrl, params.file, (pct) => {
      callbacks.onProgress?.(Math.round(pct * 0.9));
    });
  } catch (e) {
    await reportFail(videoId, `storage upload: ${(e as Error).message}`);
    throw e;
  }

  // 3. Tell the server to push Storage → YouTube. This is a small HTTP
  //    call but the server-side work takes a while (streams the whole
  //    file up to YouTube). We optimistically surface progress in the
  //    90–100% band.
  callbacks.onProgress?.(92);
  const completeRes = await fetch('/api/youtube/upload/from-storage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoId }),
  });
  if (completeRes.status === 412) {
    const body = (await completeRes.json().catch(() => null)) as { message?: string } | null;
    await reportFail(videoId, body?.message ?? 'youtube not connected');
    throw new YoutubeNotConnectedError(body?.message);
  }
  if (!completeRes.ok) {
    const text = await completeRes.text().catch(() => '');
    await reportFail(videoId, `youtube push: ${text || completeRes.status}`);
    throw new Error(`YouTube push failed: ${text || completeRes.status}`);
  }
  const done = (await completeRes.json()) as {
    youtubeVideoId: string;
    thumbnailUrl: string | null;
  };
  callbacks.onProgress?.(100);
  return { videoId, youtubeVideoId: done.youtubeVideoId, thumbnailUrl: done.thumbnailUrl };
}

/**
 * Re-run step 3 of the upload pipeline for a previously failed video. Works
 * when the staging file is still in Storage — i.e. the original failure was
 * after the browser-side storage upload succeeded (YouTube init / PUT /
 * response errors). If the staging file is gone (e.g. browser upload itself
 * failed and never reached Storage), the from-storage endpoint will write a
 * fresh "storage download URL failed" error.
 */
export async function retryYoutubeUpload(videoId: string): Promise<UploadResult> {
  const res = await fetch('/api/youtube/upload/from-storage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoId }),
  });
  if (res.status === 412) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    await reportFail(videoId, body?.message ?? 'youtube not connected');
    throw new YoutubeNotConnectedError(body?.message);
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    // The from-storage endpoint has already persisted a specific error_message
    // for server-side failures — surface it to the caller without overwriting.
    throw new Error(text || `Retry failed: ${res.status}`);
  }
  const done = (await res.json()) as {
    youtubeVideoId: string;
    thumbnailUrl: string | null;
  };
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

function putWithProgress(
  url: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Supabase Storage's /object/upload/sign endpoint expects the file wrapped
    // in multipart/form-data — raw PUT bodies get a 400. Matches what
    // supabase-js's uploadToSignedUrl sends internally.
    const form = new FormData();
    form.append('cacheControl', '3600');
    form.append('', file);

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    // Do NOT set Content-Type — the browser fills in the multipart
    // boundary automatically. Also do NOT set x-upsert — the signed URL's
    // JWT pins the upsert flag.

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else {
        // eslint-disable-next-line no-console
        console.error('[storage upload] PUT failed', xhr.status, xhr.responseText);
        reject(new Error(`Storage PUT ${xhr.status}: ${xhr.responseText.slice(0, 500)}`));
      }
    };
    xhr.onerror = () => {
      // eslint-disable-next-line no-console
      console.error('[storage upload] network error', xhr.status, xhr.responseText);
      reject(new Error('Network error uploading to Storage'));
    };
    xhr.onabort = () => reject(new Error('Upload aborted'));

    xhr.send(form);
  });
}
