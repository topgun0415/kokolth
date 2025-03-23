'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

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
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setBackgroundLoaded(true);

      const textTimeout = setTimeout(() => {
        setLogoVisible(true);

        const subtitleTimeout = setTimeout(() => {
          setTextVisible(true);
        }, 600);

        return () => clearTimeout(subtitleTimeout);
      }, 800);

      return () => clearTimeout(textTimeout);
    }, 500);

    // Image slideshow interval
    const slideInterval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => {
      clearTimeout(loadingTimeout);
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <>
      <section className='relative h-screen flex items-center justify-center overflow-hidden'>
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ease-in-out ${
            backgroundLoaded ? 'opacity-100' : 'opacity-0'
          }`}>
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt='Background slideshow'
              fill
              sizes='100vw'
              priority={i === 0}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={i === 0 ? () => setBackgroundLoaded(true) : undefined}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className='relative z-10 text-center h-screen px-4 max-w-4xl flex flex-col items-center justify-center'>
          <div
            className={`mb-4 transform transition-all duration-1000 ease-out ${
              logoVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            <Typography
              variant='h1'
              weight='regular'
              color='white'
              font='josefin'
              className='text-6xl md:text-7xl lg:text-8xl justify-center'>
              {title}
            </Typography>
          </div>

          <div
            className={`transform transition-all duration-1000 ease-out ${
              textVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            <Typography
              variant='h2'
              weight='medium'
              color='white'
              font='josefin'>
              {subtitle}
            </Typography>
          </div>

          <div
            className={`absolute bottom-[10vh] left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${
              textVisible ? 'opacity-100' : 'opacity-0'
            }`}>
            <ChevronDownIcon className='w-8 h-8 text-white animate-bounce' />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
