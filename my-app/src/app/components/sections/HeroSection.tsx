'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const images: string[] = [
  '/images/cloud1.jpg',
  '/images/cloud2.jpg',
  '/images/cloud3.jpg',
  '/images/cloud4.jpg',
];

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className='relative h-screen flex items-center justify-center overflow-hidden'>
        {/* BACKGROUND SLIDESHOW */}
        <div className='absolute inset-0 w-full h-full'>
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt='Background slideshow'
              fill
              objectFit='cover'
              priority={i === 0}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className='relative z-10 text-center px-4 max-w-4xl flex flex-col '>
          {/* Title */}
          <div className='mt-20 mb-4'>
            <Typography
              variant='h1'
              weight='regular'
              color='white'
              font='josefin'>
              {title}
            </Typography>
          </div>

          <div className='mb-70'>
            {' '}
            <Typography
              variant='h2'
              weight='medium'
              color='white'
              font='josefin'>
              {subtitle}
            </Typography>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
