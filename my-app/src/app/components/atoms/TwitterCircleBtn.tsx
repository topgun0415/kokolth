import React from 'react';

interface TwitterCircleBtnProps {
  href: string;
}

const TwitterCircleBtn: React.FC<TwitterCircleBtnProps> = ({ href }) => {
  return (
    <>
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#33CCFF] hover:bg-gray-900'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'>
          <g id='Social Media'>
            <path
              id='Vector'
              d='M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z'
              fill='white'
            />
          </g>
        </svg>
      </a>
    </>
  );
};

export default TwitterCircleBtn;
