import React from 'react';

import CustomLink from './ui/CustomLink';

const Footer: React.FC = () => {
  return (
    <footer className='border-gray-200 bg-white px-4 py-4 md:px-4 md:py-2.5 xl:px-6 '>
      <span className='container mx-auto flex h-6 flex-wrap items-center text-sm text-gray-500 sm:h-9 sm:text-center'>
        © 2023&nbsp;
        <CustomLink className='hover:underline' href='https://artemshchirov.github.io/portfolio/'>
          Developed by Ɐrtem
        </CustomLink>
      </span>
    </footer>
  );
};

export default Footer;
