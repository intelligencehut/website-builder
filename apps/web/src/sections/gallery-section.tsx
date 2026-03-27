import Image from 'next/image';

interface GalleryData {
  heading?: string;
  subtitle?: string;
  columns?: number;
  images?: { src: string; alt?: string; caption?: string }[];
}

export function GallerySection({ data }: { data: GalleryData }) {
  const cols = data.columns || 3;
  const gridClass = cols === 2 ? 'md:grid-cols-2' : cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(data.heading || data.subtitle) && (
          <div className="text-center mb-12">
            {data.heading && <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{data.heading}</h2>}
            {data.subtitle && <p className="text-lg text-gray-600 mt-3">{data.subtitle}</p>}
          </div>
        )}
        {data.images && data.images.length > 0 && (
          <div className={`grid grid-cols-1 ${gridClass} gap-4`}>
            {data.images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Image src={img.src} alt={img.alt || ''} fill className="object-cover" />
                {img.caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
