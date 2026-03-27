interface PageHeaderData {
  title?: string;
  subtitle?: string;
}

export function PageHeaderSection({ data }: { data: PageHeaderData }) {
  if (!data.title) return null;

  return (
    <section className="bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white font-serif italic">
          {data.title}
        </h1>
        {data.subtitle && (
          <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">{data.subtitle}</p>
        )}
      </div>
    </section>
  );
}
