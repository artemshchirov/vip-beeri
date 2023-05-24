import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen  bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200'>
      <Header />
      <main className='container flex flex-1 py-3 mx-auto no-scrollbar md:py-4'>{children}</main>
      <Footer />
    </div>
  );
};

export default Page;
