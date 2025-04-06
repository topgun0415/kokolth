import React from 'react';

const Shade: React.FC = () => {
  return (
    <div className='shade fixed top-0 left-0 w-full h-full z-0'>
      <div className='shade-bg right'></div>
      <div className='shade-bg left'></div>
    </div>
  );
};

export default Shade;
