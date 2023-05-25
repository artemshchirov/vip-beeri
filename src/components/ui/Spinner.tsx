import React from 'react';

import Page from '../../layouts/Page';

const Spinner: React.FC = () => {
  return (
    <Page>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
        <div role='status'>
          <div className='animate h-16 w-16 rounded-full border-4 border-dashed border-white'></div>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    </Page>
  );
};

export default Spinner;
