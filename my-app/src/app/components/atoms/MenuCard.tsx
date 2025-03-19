import React from 'react';
import Image from 'next/image';

interface MenuCardProps {
  imageUrl: string;
  alt: string;
  nameJa: string;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  imageUrl,
  nameJa,
  alt,
}) => {
  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-full max-w-xs'>
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
          <p className='text-lg font-medium text-gray-800'>{nameJa}</p>
        </div>
      </div>
    </div>
  );
};
