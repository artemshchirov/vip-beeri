import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header/Header';

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className='mb-auto flex flex-col min-h-screen justify-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200'>
      <Header />
      <main className='flex flex-col items-center justify-center flex-1 w-full p-2 no-scrollbar md:p-4'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Page;
