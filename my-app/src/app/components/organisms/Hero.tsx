'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';

interface HeroProps {
  title: string;
  subtitle: string;
}

const images: string[] = [
  '/images/cloud1.jpg',
  '/images/cloud2.jpg',
  '/images/cloud3.jpg',
  '/images/cloud4.jpg',
];

export const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
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

      {/* Kokolth */}
      <div className='relative z-10 text-center px-4 max-w-4xl'>
        <Typography variant='h1' weight='bold' color='white' className='mb-4'>
          {title}
        </Typography>
        <Typography variant='subtitle' color='white' className='mb-8'>
          {subtitle}
        </Typography>
      </div>

      {/* Additional Left-Aligned Text */}
      <div className='absolute left-4 bottom-3 z-10 text-white text-[4.5833333vw] leading-[1.2] tracking-[0.08em]'>
        <Typography variant='h2' color='white' className='mb-8'>
          高齢出産
        </Typography>
        <Typography variant='h2' color='white' className='mb-8'>
          妊活中 &amp;
        </Typography>
        <Typography variant='h2' color='white' className='mb-8'>
          高齢出産 &amp;
        </Typography>
        <Typography variant='h2' color='white' className='mb-8'>
          高齢出産について
        </Typography>
      </div>
    </section>
  );
};
