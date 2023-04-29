import React from 'react';

import logoLight from '../assets/logoLight.svg';
import textBlue from '../assets/textBlue.svg';

const Logo: React.FC = () => {
  return (
    <a className='flex' href='https://vip-beeri.vercel.app/'>
      <img alt='Logo' className='w-20 mr-1 sm:mr-3 h-14 ' src={logoLight} />
      <img
        alt='Variable Information Printing'
        className='hidden h-4 mx-auto mt-auto sm:block sm:w-64 sm:h-12'
        src={textBlue}
      />
    </a>
  );
};

export default Logo;
