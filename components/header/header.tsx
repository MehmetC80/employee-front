import Link from 'next/link';

export const Header = () => {
  return (
    <header className='h-16 w-full px-4 bg-slate-950 text-white flex items-center gap-4 '>
      <div>
        <Link
          href={'/'}
          className='text-lg font-bold text-gray-300 hover:text-gray-50 duration-300'
        >
          Angestellen Verwaltung
        </Link>
      </div>
      <div>
        <Link
          href={'/add'}
          className='text-lg font-bold text-gray-300 hover:text-gray-50 duration-300'
        >
          hinzufügen
        </Link>
      </div>
    </header>
  );
};
