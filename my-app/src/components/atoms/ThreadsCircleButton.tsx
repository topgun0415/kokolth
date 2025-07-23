import React from "react";
import Image from "next/image";

interface ThreadsCircleButtonProps {
  href: string;
}

const ThreadsCircleButton: React.FC<ThreadsCircleButtonProps> = ({ href }) => {
  return (
    <>
      <a
        href={href}
        className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-black hover:bg-gray-800 overflow-hidden"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image 
          src="/icons/Threads_icon.png"
          alt="Threads"
          width={24}
          height={24}
          className="object-contain"
        />
      </a>
    </>
  );
};

export default ThreadsCircleButton;
