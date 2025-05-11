'use client';

import React from 'react';
import Image from 'next/image';

const LineAddFriendButton: React.FC = () => {
  const handleAddFriend = () => {
    window.open('https://page.line.me/497jkrfq', '_blank');
  };

  return (
    <div className='fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-110 transition-transform duration-200'>
      <button
        onClick={handleAddFriend}
        className='bg-[#4CC764] rounded-full p-2 shadow-lg hover:shadow-xl'>
        <Image
          src='/icons/LINE_icon.png'
          alt='Add LINE Friend'
          width={40}
          height={40}
          priority
        />
      </button>
    </div>
  );
};

export default LineAddFriendButton;
