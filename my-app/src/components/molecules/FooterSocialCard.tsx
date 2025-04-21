import React from 'react';
import InstagramCircleButton from '../atoms/InstagramCircleButton';
import FacebookCircleButton from '../atoms/FacebookCircleButton';
import TwitterCircleButton from '../atoms/TwitterCircleButton';
import YouTubeCircleButton from '../atoms/YoutubeCircleButton';

interface FooterSocialCardProps {
  children?: never;
}

const FooterSocialCard: React.FC<FooterSocialCardProps> = ({}) => {
  return (
    <>
      <div className='flex justify-between items-center gap-5 text-sm mt-4'>
        <InstagramCircleButton href='https://www.instagram.com' />
        <FacebookCircleButton href='https://www.facebook.com' />
        <TwitterCircleButton href='https://x.com/' />
        <YouTubeCircleButton href='https://www.youtue.com' />
      </div>
    </>
  );
};

export default FooterSocialCard;
