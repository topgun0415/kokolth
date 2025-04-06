'use client';

import React from 'react';
import '../../(routes)/globals.css';

const Shade: React.FC = () => {
  return (
    <>
      <div className='shade absolute top-0 left-0 w-full h-full -z-10'>
        <div className='shade-bg left'></div>
        <div className='shade-bg right'></div>
      </div>
    </>
  );
};

export default Shade;
