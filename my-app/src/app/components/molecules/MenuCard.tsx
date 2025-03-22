import React from 'react';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';

interface MenuCardProps {
  imageUrl: string;
  alt: string;
  nameJa: string;
  onClick?: () => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  imageUrl,
  nameJa,
  alt,
  onClick,
}) => {
  return (
    <div
      className='bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-full max-w-xs cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'
      onClick={onClick}>
      {/*　写真 */}
      <div className='w-full h-48 relative'>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          objectFit='cover'
          className='rounded-lg'
        />
      </div>

      {/* 内容 */}
      <div className='mt-4 text-center'>
        <div className='name'>
          <Typography
            variant='caption'
            weight='medium'
            color='primary'
            font='light'>
            {nameJa}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
