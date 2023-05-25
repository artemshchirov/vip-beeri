import React from 'react';

import CustomLink from '../components/ui/CustomLink';

const NotFound = () => {
  return (
    <section className='flex h-screen items-center p-16 text-gray-600 dark:bg-gray-900 dark:text-gray-100'>
      <div className='container mx-auto my-8 flex flex-col items-center justify-center px-5'>
        <div className='max-w-md text-center'>
          <h2 className='mb-8 text-9xl font-extrabold dark:text-gray-600'>
            <span className='sr-only'>Error</span>404
          </h2>
          <p className='text-2xl font-semibold md:text-3xl'>Sorry, we couldn&apos;t find this page.</p>
          <p className='mb-8 mt-4 dark:text-gray-400'>
            But don&apos;t worry, you can find plenty of other things on our homepage.
          </p>
          <CustomLink
            className='rounded bg-violet-500 px-8 py-3 font-semibold text-white dark:bg-violet-400 dark:text-gray-900'
            href='/'
          >
            Back to homepage
          </CustomLink>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
