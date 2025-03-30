'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '../atoms/Typography';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  const [videoError, setVideoError] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setTitleVisible(true), 200);
            setTimeout(() => setSubtitleVisible(true), 600);
            observer.unobserve(sectionElement);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px',
      }
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative h-screen flex items-center justify-center overflow-hidden bg-black'>
      {/* Video Background */}
      {!videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className='absolute inset-0 w-full h-full object-cover'
          onError={() => {
            console.error('Video failed to load');
            setVideoError(true);
          }}>
          <source src='/images/backgroundVideo.mp4' type='video/mp4' />
        </video>
      )}

      {/* Content layer */}
      <div className='relative z-10 text-center px-4 max-w-4xl mb-35'>
        <div
          className={`transform transition-all duration-1000 ease-out ${
            titleVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}>
          <Typography variant='h2' weight='medium' color='white' font='josefin'>
            ココルス
          </Typography>

          <Typography
            variant='h1'
            weight='regular'
            color='white'
            font='josefin'
            className='text-6xl md:text-7xl lg:text-8xl mb-4'>
            {title}
          </Typography>
        </div>

        <div
          className={`transform transition-all duration-1000 ease-out ${
            subtitleVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}>
          <Typography variant='h2' weight='medium' color='white' font='josefin'>
            {subtitle}
          </Typography>
        </div>

        <div className='absolute top-100 left-1/2 transform -translate-x-1/2'>
          <ChevronDownIcon className='w-8 h-8 text-white animate-bounce' />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
