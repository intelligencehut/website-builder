interface VideoItem {
  youtubeId?: string;
  title?: string;
  caption?: string;
}

interface VideoData {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  items?: VideoItem[];
}

export function VideoSection({ data }: { data: VideoData }) {
  const videos = (data.items ?? []).filter((v): v is VideoItem & { youtubeId: string } =>
    Boolean(v?.youtubeId)
  );
  if (videos.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(data.eyebrow || data.heading || data.subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            {data.eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                {data.eyebrow}
              </p>
            )}
            {data.heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{data.heading}</h2>
            )}
            {data.subtitle && (
              <p className="text-lg text-gray-600 leading-relaxed">{data.subtitle}</p>
            )}
          </div>
        )}

        <div
          className={
            videos.length === 1
              ? 'max-w-3xl mx-auto'
              : 'grid gap-6 md:grid-cols-2 lg:grid-cols-' + (videos.length >= 3 ? '3' : '2')
          }
        >
          {videos.map((v, i) => (
            <figure key={`${v.youtubeId}-${i}`} className="space-y-2">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-100">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                  title={v.title || 'YouTube video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              {(v.title || v.caption) && (
                <figcaption className="space-y-1">
                  {v.title && <p className="font-medium text-gray-900">{v.title}</p>}
                  {v.caption && <p className="text-sm text-gray-600 leading-relaxed">{v.caption}</p>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
