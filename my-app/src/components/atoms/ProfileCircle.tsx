import React from 'react';
import Image from 'next/image';

interface ProfileCircleProps {
  onPress?: () => void;
}

const ProfileCircle: React.FC<ProfileCircleProps> = ({ onPress }) => {
  const handleClick = () => {
    if (onPress) onPress();
  };

  return (
    <div
      className='w-10 h-10 rounded-full overflow-hidden cursor-pointer'
      onClick={handleClick}>
      <Image
        src='/icons/defaultProfile.webp'
        alt='Profile'
        width={40}
        height={40}
        className='object-cover'
      />
    </div>
  );
};

export default ProfileCircle;
