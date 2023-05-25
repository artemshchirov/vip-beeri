import React from 'react';

import Logo from './Logo';
import CustomLink from './ui/CustomLink';

const Header: React.FC = () => {
  return (
    <header className='border-gray-200 bg-white px-2 md:px-4 lg:px-6 xl:px-8 '>
      <nav className='container mx-auto flex items-center justify-between'>
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
