interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

interface StatsData {
  heading?: string;
  items?: StatItem[];
}

export function StatsSection({ data }: { data: StatsData }) {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {data.heading && (
          <h2 className="text-3xl font-bold text-center mb-12">{data.heading}</h2>
        )}
        {data.items && data.items.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {data.items.map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-bold text-orange-400">
                  {stat.value}{stat.suffix || ''}
                </p>
                <p className="text-gray-300 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
