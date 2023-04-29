import React from 'react';

import CustomLink from './ui/CustomLink';

const Footer: React.FC = () => {
  return (
    <footer className='px-4 py-4 bg-white border-gray-200 md:px-4 xl:px-8 lg:px-6 '>
      <span className='container flex flex-wrap items-center h-6 mx-auto text-sm text-gray-500 sm:h-9 sm:text-center'>
        © 2023&nbsp;
        <CustomLink className='hover:underline' href='https://artemshchirov.github.io/portfolio/'>
          Developed by Ɐrtem
        </CustomLink>
      </span>
    </footer>
  );
};

export default Footer;
