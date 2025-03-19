import React from 'react';

interface FacebookCirclBtnProps {
  href: string;
}

const FacebookCirclBtnProps: React.FC<FacebookCirclBtnProps> = ({ href }) => {
  return (
    <>
      <a
        href={href}
        className='relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#337FFF] hover:bg-[#3b5b9e]'
        target='_blank'
        rel='noopener noreferrer'>
        <svg
          className='w-6 h-6 text-white'
          viewBox='0 0 8 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M7.04111 7.81204L7.41156 5.46043H5.1296V3.93188C5.1296 3.28886 5.44818 2.66054 6.46692 2.66054H7.51899V0.657999C6.90631 0.560385 6.28723 0.507577 5.66675 0.5C3.78857 0.5 2.56239 1.62804 2.56239 3.66733V5.46043H0.480469V7.81204H2.56239V13.5H5.1296V7.81204H7.04111Z'
            fill='currentColor'></path>
        </svg>
      </a>
    </>
  );
};

export default FacebookCirclBtnProps;
