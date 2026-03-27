import Image from 'next/image';

interface HeroData {
  heading?: string;
  headingHighlight?: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: string;
  backgroundImage?: string;
}

export function HeroSection({ data }: { data: HeroData }) {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-orange-50 to-white">
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image src={data.backgroundImage} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-white/80" />
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid gap-12 items-center ${data.image ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-3xl'}`}>
          <div className="space-y-8">
            <div className="space-y-4">
              {data.heading && (
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {data.heading}
                  {data.headingHighlight && (
                    <span className="text-orange-600 block">{data.headingHighlight}</span>
                  )}
                </h1>
              )}
              {data.subtitle && (
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">{data.subtitle}</p>
              )}
              {data.description && (
                <p className="text-lg text-gray-600 leading-relaxed">{data.description}</p>
              )}
            </div>
            {(data.primaryCta || data.secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {data.primaryCta && (
                  <a href={data.primaryCta.href} className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
                    {data.primaryCta.label}
                  </a>
                )}
                {data.secondaryCta && (
                  <a href={data.secondaryCta.href} className="inline-flex items-center justify-center px-6 py-3 border-2 border-orange-600 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors">
                    {data.secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </div>
          {data.image && (
            <div className="relative h-[350px] lg:h-[450px]">
              <div className="rounded-2xl overflow-hidden shadow-2xl h-full relative">
                <Image src={data.image} alt={data.heading || ''} fill className="object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
