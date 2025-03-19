import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';
import QnAButton from '../atoms/QnAButton';
import FooterSocialBar from '../molecules/FooterSocialBar';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-50 text-white'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-20'>
          <div>
            <Image
              className='rounded-full'
              src='/logo_footer.png'
              alt='kokolth logo'
              width={100}
              height={100}
            />

            <Typography
              variant='caption'
              color='gray'
              className='mb-4 opacity-80'>
              〒812-0013
            </Typography>
            <br />
            <Typography
              variant='caption'
              color='gray'
              className='mb-4 opacity-80'>
              福岡県福岡市博多区博多駅東3丁目5-15 3-5-15 Hakataeki Higashi
              Hakata-ku, Fukuoka-shi, Fukuoka-ken 812-0013
            </Typography>
          </div>
          <div></div>
          <div>
            <FooterSocialBar />
            <QnAButton />
            <div className='mt-9'>
              <Typography variant='caption' color='gray' className='opacity-70'>
                &copy; {currentYear} kokolth. All Rights Reserved.
              </Typography>
              <br />
              <Typography variant='caption' color='gray' className='opacity-70'>
                Designed with ❤️ by kokolth team
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
