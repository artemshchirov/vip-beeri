import React from 'react';

import logoLight from '../assets/logoLight.svg';
import textBlue from '../assets/textBlue.svg';

const Logo: React.FC = () => {
  return (
    <a className='flex' href='https://vip-beeri.vercel.app/'>
      <img alt='Logo' className='mr-1 h-14 w-20 sm:mr-3 ' src={logoLight} />
      <img
        alt='Variable Information Printing'
        className='mx-auto mt-auto hidden h-4 sm:block sm:h-12 sm:w-64'
        src={textBlue}
      />
    </a>
  );
};

export default Logo;
