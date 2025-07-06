import React from 'react';
import Link from 'next/link';
import { Typography } from '../atoms/Typography';
import FooterSocialCard from '../molecules/FooterSocialCard';

export const Footer = () => {
  return (
    <footer className='bg-gray-50 text-white'>
      <div className='container mx-auto px-4 py-10'>
        <div className='flex flex-col md:flex-row justify-between'>
          {/* right section */}
          <div className='flex flex-col items-center md:items-start justify-between h-full text-center md:text-left'>
            <Typography
              variant='h4'
              weight='medium'
              color='primary'
              font='yugothic-medium'
              className='md:mt-10 lg:mt-2'>
              KOKOLTH
            </Typography>
            <Typography
              variant='caption'
              weight='medium'
              color='primary'
              font='yugothic-regular'>
              Tel &nbsp;
              <a
                href='tel:0921231234'
                className='text-blue-600 hover:underline'>
                092-123-1234
              </a>
            </Typography>

            <Typography
              variant='caption'
              weight='light'
              color='primary'
              font='yugothic-regular'>
              Email &nbsp;
              <a
                href='mailto:kokolth@example.co.jp'
                className='text-blue-600 hover:underline'
                target='_blank'
                rel='noopener noreferrer'>
                kokolth@example.co.jp
              </a>
            </Typography>
          </div>

          {/* right section */}
          <div className='flex flex-col items-center md:items-start justify-between h-full text-center md:text-left'>
            <FooterSocialCard />
            <div className='mt-2 flex flex-col items-center md:items-start space-y-1'>
              <div className='flex space-x-1 text-[10px]'>
                <Link
                  href='/terms'
                  className='text-gray-600 hover:underline font-yugothic-regular'>
                  利用規約
                </Link>
                <span className='text-gray-600 font-yugothic-regular'>|</span>
                <Link
                  href='/faq'
                  className='text-gray-600 hover:underline font-yugothic-regular'>
                  よくある質問
                </Link>
              </div>
              <Typography
                variant='caption'
                weight='light'
                color='primary'
                font='yugothic-regular'
                className='text-[12px]'>
                ⓒ Kokolth. All Rights Reserved.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
