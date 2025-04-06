import React from 'react';
import { Typography } from '../atoms/Typography';
import FooterSocialCard from '../molecules/FooterSocialCard';

export const Footer: React.FC = () => {
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
            <Typography
              variant='caption'
              weight='medium'
              color='primary'
              font='yugothic-regular'
              className='text-[10px]'>
              営業時間 &nbsp; 平日 8:00-19:30 &nbsp;|&nbsp; 土日祝 10:00-19:00
            </Typography>
          </div>

          {/* right section */}
          <div className='flex flex-col items-center md:items-start justify-between h-full text-center md:text-left'>
            <FooterSocialCard />
            <div className='mt-2'>
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
