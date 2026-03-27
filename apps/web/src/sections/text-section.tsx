interface TextData {
  heading?: string;
  body?: string;
}

export function TextSection({ data }: { data: TextData }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {data.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{data.heading}</h2>
        )}
        {data.body && (
          <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: data.body }} />
        )}
      </div>
    </section>
  );
}
