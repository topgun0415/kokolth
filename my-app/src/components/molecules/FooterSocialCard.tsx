import React from 'react';
import InstagramCircleButton from '../atoms/InstagramCircleButton';
import LineCircleButton from '../atoms/LineCircleButton';
import ThreadsCircleButton from '../atoms/ThreadsCircleButton';

interface FooterSocialCardProps {
  children?: never;
}

const FooterSocialCard: React.FC<FooterSocialCardProps> = ({}) => {
  return (
    <>
      <div className='flex justify-between items-center gap-5 text-sm mt-2'>
        <LineCircleButton href='https://page.line.me/497jkrfq' />
        <InstagramCircleButton href='https://www.instagram.com/hisako3kidssweets' />
        <ThreadsCircleButton href='https://www.threads.net/hisako3kidssweets' />
      </div>
    </>
  );
};

export default FooterSocialCard;
