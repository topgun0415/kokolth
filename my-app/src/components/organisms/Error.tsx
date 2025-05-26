'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Typography } from '../atoms/Typography';

interface ErrorProps {
  status: string;
  message?: string;
}

export const Error: React.FC<ErrorProps> = ({ status }) => {
  const [loaded, setLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const getMessage = (status: string, message?: string) => {
    if (status === '404') return 'ページが見つかりませんでした';
    if (status === '500') return 'サーバに問題が発生しました';

    return message;
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white p-4'>
      <div className='flex justify-center items-center md:gap-4 mb-12'>
        {status.split('').map((num, index) => (
          <div
            key={index}
            className={`
              w-24 h-24 md:w-36 md:h-36 
              rounded-xl flex items-center justify-center
              bg-gradient-to-br from-white to-gray-100
              shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)]
              transition-all duration-500 ease-out
              opacity-0 translate-y-5
              ${loaded ? 'opacity-100 translate-y-0' : ''}
              ${
                hoveredIndex === index
                  ? 'scale-105 -translate-y-2 shadow-[12px_12px_20px_rgba(0,0,0,0.15),-12px_-12px_20px_rgba(255,255,255,0.9)]'
                  : ''
              }
              transition-delay-${index * 150}
            `}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <span className='text-5xl md:text-7xl font-bold text-gray-800 select-none'>
              {num}
            </span>
          </div>
        ))}
      </div>

      <Typography
        variant='h4'
        weight='light'
        color='gray'
        font='yugothic-regular'
        className={`text-xl md:text-2xl lg:text-4xl text-gray-400 mb-8 transform transition duration-600 ease-in-out
          opacity-0 translate-y-5
          ${loaded ? 'opacity-100 translate-y-0' : ''}
          delay-[450ms]`}>
        {getMessage(status)}
      </Typography>

      <Link
        href='/'
        className={`
          mt-8 px-6 py-3 
          text-gray-600 rounded-lg
          border border-gray-200
          bg-white hover:bg-gray-50
          shadow-lg hover:shadow-xl
          transition-all duration-300
          transform hover:-translate-y-1
          opacity-0 translate-y-1
          ${loaded ? 'opacity-100 translate-y-0' : ''}
          delay-[100ms]
        `}>
        ホームに戻る
      </Link>
    </div>
  );
};
