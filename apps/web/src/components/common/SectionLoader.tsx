interface SectionLoaderProps {
  className?: string;
}

export function SectionLoader({ className = 'py-20' }: SectionLoaderProps) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600'></div>
    </div>
  );
}
