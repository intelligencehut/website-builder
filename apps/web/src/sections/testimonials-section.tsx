interface TestimonialItem {
  quote: string;
  name?: string;
  title?: string;
  image?: string;
}

interface TestimonialsData {
  heading?: string;
  subtitle?: string;
  items?: TestimonialItem[];
}

export function TestimonialsSection({ data }: { data: TestimonialsData }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(data.heading || data.subtitle) && (
          <div className="text-center mb-12">
            {data.heading && <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{data.heading}</h2>}
            {data.subtitle && <p className="text-lg text-gray-600 mt-3">{data.subtitle}</p>}
          </div>
        )}
        {data.items && data.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {data.items.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <blockquote className="text-gray-700 leading-relaxed mb-4">&ldquo;{item.quote}&rdquo;</blockquote>
                <div className="flex items-center gap-3">
                  {item.image && (
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                      <img src={item.image} alt={item.name || ''} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    {item.name && <p className="font-semibold text-gray-900 text-sm">{item.name}</p>}
                    {item.title && <p className="text-gray-500 text-xs">{item.title}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
