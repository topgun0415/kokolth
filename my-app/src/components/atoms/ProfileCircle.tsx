import React from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';

interface ProfileCircleProps {
  onPress?: () => void;
}

const ProfileCircle: React.FC<ProfileCircleProps> = ({ onPress }) => {
  const { isLoggedIn, userImage } = useAuthStore();

  const handleClick = () => {
    if (onPress) onPress();
  };

  return (
    <div
      className='w-10 h-10 rounded-full overflow-hidden cursor-pointer'
      onClick={handleClick}>
      <Image
        src={
          isLoggedIn
            ? userImage || '/icons/default-profile.webp'
            : '/icons/defaultProfile.webp'
        }
        alt='Profile'
        width={40}
        height={40}
        className='object-cover'
      />
    </div>
  );
};

export default ProfileCircle;
