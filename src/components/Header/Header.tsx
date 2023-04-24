import React from 'react';

import CustomLink from '../ui/CustomLink';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className='px-2 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200 dark:bg-gray-800'>
      <nav className='container flex flex-wrap items-center justify-between mx-auto'>
        <a className='flex items-center' href='https://vip-beeri.vercel.app/'>
          <Logo />
          <h1 className='self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white'>VIP</h1>
        </a>
        <div>
          <CustomLink className='text-black dark:text-white mr-3 hover:underline' href='/'>
            Home
          </CustomLink>
          <CustomLink className='text-black dark:text-white hover:underline' href='/calendar'>
            Calendar
          </CustomLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
