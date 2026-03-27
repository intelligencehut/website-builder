import Image from 'next/image';

interface CardItem {
  title?: string;
  description?: string;
  image?: string;
  badge?: string;
  link?: string;
}

interface CardGridData {
  heading?: string;
  subtitle?: string;
  columns?: number;
  items?: CardItem[];
}

export function CardGridSection({ data }: { data: CardGridData }) {
  const cols = data.columns || 3;
  const gridClass = cols === 2 ? 'md:grid-cols-2' : cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(data.heading || data.subtitle) && (
          <div className="text-center mb-12">
            {data.heading && <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{data.heading}</h2>}
            {data.subtitle && <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">{data.subtitle}</p>}
          </div>
        )}
        {data.items && data.items.length > 0 && (
          <div className={`grid grid-cols-1 ${gridClass} gap-8`}>
            {data.items.map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {item.image && (
                  <div className="relative h-48">
                    <Image src={item.image} alt={item.title || ''} fill className="object-cover" />
                  </div>
                )}
                <div className="p-6">
                  {item.badge && (
                    <span className="inline-block px-2.5 py-0.5 bg-orange-50 text-orange-700 text-xs font-medium rounded-full mb-3">{item.badge}</span>
                  )}
                  {item.title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>}
                  {item.description && <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>}
                  {item.link && (
                    <a href={item.link} className="inline-block mt-4 text-orange-600 text-sm font-medium hover:underline">Learn more →</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
