import React from 'react';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';
import QnAButton from '../atoms/QnAButton';
import FooterSocialBar from '../molecules/FooterSocialBar';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-50 text-white'>
      <div className='container mx-auto px-4 py-10'>
        <div className='flex flex-col md:flex-row justify-between'>
          {/* right section */}
          <div className='flex flex-col items-center md:items-start justify-between h-full text-center md:text-left'>
            <Image
              className='rounded-full'
              src='/logo_footer.png'
              alt='kokolth logo'
              width={100}
              height={100}
            />
            <Typography
              variant='caption'
              weight='medium'
              color='primary'
              font='josefin'>
              Tel &nbsp;
              <a
                href='tel:0921231234'
                className='text-blue-600 hover:underline'>
                092-123-1234
              </a>
            </Typography>

            <Typography
              variant='caption'
              weight='medium'
              color='primary'
              font='josefin'>
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
              font='josefin'>
              営業時間 &nbsp; 平日 8:00-19:30 &nbsp;|&nbsp; 土日祝 10:00-19:00
            </Typography>
          </div>

          {/* left section */}
          <div className='flex flex-col items-center md:items-start justify-between h-full text-center md:text-left'>
            <FooterSocialBar />
            <QnAButton />
            <div className='mt-2'>
              <Typography variant='caption' color='primary' font='josefin'>
                &copy; {currentYear} kokolth. All Rights Reserved.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
