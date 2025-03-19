import React from 'react';

interface QnAButtonProps {
  children?: never;
}

const QnAButton: React.FC<QnAButtonProps> = () => {
  return (
    <>
      <button className='mt-7 w-[190px] h-[50px] inline-flex items-center justify-center rounded-md bg-white border border-gray-400 px-6 font-sm text-black transition active:scale-110 hover:bg-gray-400 hover:text-white'>
        お問い合わせ
        <svg
          className='icon ms-2 w-4 h-4 fill-current'
          xmlns='http://www.w3.org/2000/svg'
          width='14'
          height='14'
          viewBox='0 0 14 14'>
          <g>
            <path
              className='e'
              d='M11.81,8.75h-.88c-.24,0-.44,.2-.44,.44v3.06H1.75V3.5h3.94c.24,0,.44-.2,.44-.44v-.88c0-.24-.2-.44-.44-.44H1.31c-.72,0-1.31,.59-1.31,1.31V12.69c0,.72,.59,1.31,1.31,1.31H10.94c.73,0,1.31-.59,1.31-1.31v-3.5c0-.24-.2-.44-.44-.44ZM13.34,0h-3.5c-.36,0-.66,.3-.66,.66,0,.17,.07,.34,.19,.46l.98,.98L3.69,8.76c-.12,.12-.19,.29-.19,.46,0,.17,.07,.34,.19,.46l.62,.62c.12,.12,.29,.19,.47,.19,.17,0,.34-.07,.47-.19L11.9,3.65l.98,.98c.26,.26,.67,.26,.93,0,.13-.13,.2-.3,.19-.47V.66c0-.36-.29-.66-.66-.66h0Z'></path>
          </g>
        </svg>
      </button>
    </>
  );
};

export default QnAButton;
