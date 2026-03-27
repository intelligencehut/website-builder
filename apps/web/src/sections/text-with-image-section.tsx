import Image from 'next/image';

interface TextWithImageData {
  heading?: string;
  subtitle?: string;
  body?: string;
  items?: string[];
  itemsHeading?: string;
  image?: string;
  imageAlt?: string;
  reversed?: boolean;
}

export function TextWithImageSection({ data }: { data: TextWithImageData }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${data.reversed ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`space-y-8 ${data.reversed ? 'lg:order-2' : ''}`}>
            <div className="space-y-4">
              {data.heading && <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{data.heading}</h2>}
              {data.subtitle && <p className="text-lg text-gray-600">{data.subtitle}</p>}
            </div>
            <div className="space-y-6">
              {data.body && <p className="text-lg text-gray-700 leading-relaxed">{data.body}</p>}
              {data.items && data.items.length > 0 && (
                <>
                  {data.itemsHeading && <h4 className="text-xl font-semibold text-gray-900">{data.itemsHeading}</h4>}
                  <ul className="space-y-2 text-gray-700">
                    {data.items.map((item, i) => <li key={i}>• {item}</li>)}
                  </ul>
                </>
              )}
            </div>
          </div>
          {data.image && (
            <div className={`relative ${data.reversed ? 'lg:order-1' : ''}`}>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image src={data.image} alt={data.imageAlt || data.heading || ''} width={600} height={500} className="object-cover w-full h-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
