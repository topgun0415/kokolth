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
        <Typography
          variant='h1'
          weight='regular'
          color='white'
          font='josefin'
          className=''>
          {title}
        </Typography>
        <Typography
          variant='h3'
          weight='medium'
          color='white'
          font='josefin'
          className='mb-2'>
          {subtitle}
        </Typography>
        <Typography
          variant='h4'
          weight='medium'
          color='white'
          font='josefin'
          className='mb-10'>
          メールカウンセリングルーム
        </Typography>
        <br />
        <Typography
          variant='subtitle'
          weight='medium'
          color='white'
          font='josefin'
          className=''>
          高齢出産
        </Typography>
        <Typography
          variant='subtitle'
          weight='medium'
          color='white'
          font='josefin'
          className=''>
          妊活中
        </Typography>
        <Typography
          variant='subtitle'
          weight='medium'
          color='white'
          font='josefin'
          className=''>
          妊娠中
        </Typography>
        <Typography
          variant='subtitle'
          weight='medium'
          color='white'
          font='josefin'
          className=''>
          高齢育児
        </Typography>
        <Typography
          variant='subtitle'
          weight='medium'
          color='white'
          font='josefin'
          className=''>
          夫婦関係について
        </Typography>
      </div>
    </section>
  );
};
