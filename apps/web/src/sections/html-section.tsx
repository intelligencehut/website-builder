interface HtmlData {
  body?: string;
}

export function HtmlSection({ data }: { data: HtmlData }) {
  if (!data.body) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: data.body }} />
      </div>
    </section>
  );
}
