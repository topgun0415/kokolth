import React from 'react';
import Image from 'next/image';

interface ProfileCircleProps {
  imageUrl?: string;
  status: 'login' | 'logout';
  onPress?: () => void;
}

const ProfileCircle: React.FC<ProfileCircleProps> = ({
  imageUrl,
  status,
  onPress,
}) => {
  const handleClick = () => {
    if (onPress) {
      onPress();
    }
  };

  if (status === 'login') {
    return (
      <div
        className='w-10 h-10 rounded-full overflow-hidden cursor-pointer'
        onClick={handleClick}>
        <Image
          src={imageUrl || '/icons/default-profile.webp'}
          alt='Profile'
          width={40}
          height={40}
          className='object-cover'
        />
      </div>
    );
  }

  // Default return for 'logout' status or any other case
  return (
    <div
      className='relative w-10 h-10 rounded-full overflow-hidden cursor-pointer'
      onClick={handleClick}>
      <Image
        src='/icons/logout.webp'
        alt='Profile'
        width={40}
        height={40}
        className='object-cover'
      />
    </div>
  );
};

export default ProfileCircle;
