import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHeader({
  title,
  subtitle,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <section className='relative py-20 bg-gray-900'>
      {backgroundImage && (
        <div className='absolute inset-0'>
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className='object-cover opacity-30'
            priority
          />
          <div className='absolute inset-0 bg-black bg-opacity-50'></div>
        </div>
      )}

      <div className='relative container mx-auto px-4 text-center'>
        <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
          {title}
        </h1>
        {subtitle && (
          <p className='text-xl text-gray-200 max-w-3xl mx-auto'>{subtitle}</p>
        )}
      </div>
    </section>
  );
}
