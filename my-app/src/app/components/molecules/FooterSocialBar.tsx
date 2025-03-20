import React from 'react';
import TwitterCircleBtn from '../atoms/TwitterCircleBtn';
import YoutubeCircleBtn from '../atoms/YoutubeCircleBtn';
import FacebookCirclBtnProps from '../atoms/FacebookCircleButton';
import InstagramCircleBtn from '../atoms/InstagramCircleButton';

interface FooterSocialBarProps {
  children?: never;
}

const FooterSocialBar: React.FC<FooterSocialBarProps> = () => {
  return (
    <>
      <div className='flex justify-left gap-4 mt-8'>
        <InstagramCircleBtn href='https://instagram.com/' />
        <FacebookCirclBtnProps href='https://facebook.com/' />
        <TwitterCircleBtn href='https://facebook.com/' />
        <YoutubeCircleBtn href='https://youtube.com/' />
      </div>
    </>
  );
};

export default FooterSocialBar;
