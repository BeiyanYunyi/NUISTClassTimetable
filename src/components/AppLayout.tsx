import Favicon from '@/app/icon.svg';
import Footer from '@/components/Footer';
import { ModeToggle } from '@/components/ModeToggle';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <header className="h-[3.75rem] sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center h-full px-4">
          <Link href="/">
            <Favicon className="h-12 w-12" />
          </Link>
          <Link href="/" className="ml-2 text-xl">
            信带课表
          </Link>
          <div className="flex-grow" />
          <ModeToggle />
        </div>
      </header>
      <main className="flex items-center justify-center relative z-10 pb-20 bg-background shadow-md pt-[3.75rem] min-h-[100vh]">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
