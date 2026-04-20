/**
 * Client-side YouTube upload driver.
 *
 * Flow:
 *   1. POST /api/youtube/upload/init → { videoId, uploadUrl }
 *   2. PUT <uploadUrl> with the file bytes (direct to Google, with progress)
 *   3. POST /api/youtube/upload/complete → { ok, youtubeVideoId }
 *
 * On failure at any step, POST /api/youtube/upload/fail so the DB row
 * doesn't sit in 'uploading' forever.
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
  constructor() {
    super('YouTube channel not connected');
    this.name = 'YoutubeNotConnectedError';
  }
}

export async function uploadVideoToYoutube(
  params: UploadParams,
  callbacks: UploadCallbacks = {}
): Promise<UploadResult> {
  // 1. Init
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
    throw new YoutubeNotConnectedError();
  }
  if (!initRes.ok) {
    const text = await initRes.text().catch(() => '');
    throw new Error(`init failed: ${text || initRes.status}`);
  }
  const { videoId, uploadUrl } = (await initRes.json()) as {
    videoId: string;
    uploadUrl: string;
  };

  // 2. PUT file bytes to YouTube via our server-side proxy (browser→YouTube
  //    direct PUT is blocked by CORS for non-whitelisted origins).
  try {
    const youtubeResponse = await putViaProxy(
      params.siteId,
      uploadUrl,
      params.file,
      callbacks.onProgress
    );
    const youtubeVideoId = youtubeResponse?.id;
    if (!youtubeVideoId) {
      throw new Error('YouTube response missing video id');
    }

    // 3. Complete
    const completeRes = await fetch('/api/youtube/upload/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, youtubeVideoId }),
    });
    if (!completeRes.ok) {
      const text = await completeRes.text().catch(() => '');
      throw new Error(`complete failed: ${text || completeRes.status}`);
    }
    const completed = (await completeRes.json()) as { thumbnailUrl: string | null };
    return { videoId, youtubeVideoId, thumbnailUrl: completed.thumbnailUrl };
  } catch (e) {
    fetch('/api/youtube/upload/fail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, errorMessage: (e as Error).message }),
      keepalive: true,
    }).catch(() => {});
    throw e;
  }
}

function putViaProxy(
  siteId: string,
  uploadUrl: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<{ id?: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/youtube/upload/proxy');
    xhr.setRequestHeader('X-Site-Id', siteId);
    xhr.setRequestHeader('X-Upload-Url', uploadUrl);
    xhr.setRequestHeader('X-Mime-Type', file.type || 'video/*');

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const parsed = JSON.parse(xhr.responseText);
          // Proxy wraps YouTube response: { status, body: {...} }
          resolve(parsed?.body ?? parsed);
        } catch {
          resolve({});
        }
      } else {
        reject(new Error(`Upload proxy ${xhr.status}: ${xhr.responseText.slice(0, 500)}`));
      }
    };
    xhr.onerror = () => reject(new Error('Network error uploading to proxy'));
    xhr.onabort = () => reject(new Error('Upload aborted'));

    xhr.send(file);
  });
}
