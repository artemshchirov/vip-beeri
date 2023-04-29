import React from 'react';

import Logo from './Logo';
import CustomLink from './ui/CustomLink';

const Header: React.FC = () => {
  return (
    <header className='px-2 bg-white border-gray-200 md:px-4 xl:px-8 lg:px-6 '>
      <nav className='container flex items-center justify-between mx-auto'>
        <Logo />
        <ul className='flex text-[#213C7D] '>
          <li>
            <CustomLink activeClassName='text-[#1099D6]' className='mr-3 font-semibold hover:underline' href='/'>
              Home
            </CustomLink>
          </li>
          <li>
            <CustomLink activeClassName='text-[#1099D6]' className='font-semibold hover:underline' href='/calendar'>
              Calendar
            </CustomLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
