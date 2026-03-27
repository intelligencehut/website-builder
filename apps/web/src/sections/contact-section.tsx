interface ContactData {
  heading?: string;
  email?: string;
  phone?: string;
  address?: string;
  body?: string;
}

export function ContactSection({ data }: { data: ContactData }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {data.heading && <h2 className="text-3xl font-bold text-gray-900 mb-8">{data.heading}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {data.email && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</h3>
                <a href={`mailto:${data.email}`} className="text-lg text-orange-600 hover:underline">{data.email}</a>
              </div>
            )}
            {data.phone && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</h3>
                <a href={`tel:${data.phone}`} className="text-lg text-gray-900">{data.phone}</a>
              </div>
            )}
            {data.address && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</h3>
                <p className="text-lg text-gray-700">{data.address}</p>
              </div>
            )}
          </div>
          {data.body && (
            <div className="prose prose-lg text-gray-700" dangerouslySetInnerHTML={{ __html: data.body }} />
          )}
        </div>
      </div>
    </section>
  );
}
