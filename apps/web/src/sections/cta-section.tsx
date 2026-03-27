interface CtaData {
  heading?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  background?: 'light' | 'dark' | 'accent';
}

export function CtaSection({ data }: { data: CtaData }) {
  const bg = data.background === 'dark' ? 'bg-gray-900 text-white' : data.background === 'accent' ? 'bg-orange-600 text-white' : 'bg-orange-50 text-gray-900';

  return (
    <section className={`py-16 ${bg}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        {data.heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.heading}</h2>}
        {data.description && <p className="text-lg opacity-80 mb-8">{data.description}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {data.primaryCta && (
            <a href={data.primaryCta.href} className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              {data.primaryCta.label}
            </a>
          )}
          {data.secondaryCta && (
            <a href={data.secondaryCta.href} className="inline-flex items-center justify-center px-8 py-3 border-2 border-current font-semibold rounded-lg hover:opacity-80 transition-opacity">
              {data.secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
