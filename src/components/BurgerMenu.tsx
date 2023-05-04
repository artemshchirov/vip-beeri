import React, { useState } from 'react';

interface BurgerMenuProps {
  children: React.ReactNode;
}

const BurgerMenu = ({ children }: BurgerMenuProps) => {
  const [collapse, setCollapse] = useState<boolean>(true);

  const handleCollapse = () => setCollapse((prevState) => !prevState);

  return (
    <>
      <div className={`${collapse ? 'hidden' : ''} w-full bg-white md:block md:w-auto`}>{children}</div>
      <button
        className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 '
        onClick={handleCollapse}
        type='button'
      >
        <span className='sr-only'>Open main menu</span>
        <i className='pi pi-bars'></i>
      </button>
    </>
  );
};

export default BurgerMenu;
