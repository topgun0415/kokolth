// src/components/organisms/AboutSection.tsx
import React from 'react';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';

export const AboutSection: React.FC = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
      <div className='relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden'>
        <Image
          src='/images/about-cafe.jpg'
          alt='33 Café interior'
          layout='fill'
          objectFit='cover'
          className='rounded-lg'
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJZQPXQVfHlQAAAABJRU5ErkJggg=='
        />
      </div>

      <div>
        <Typography variant='h3' weight='bold' color='primary' className='mb-4'>
          Our Story
        </Typography>

        <Typography variant='body' color='gray' className='mb-6'>
          Founded in 2020, 33 Café was born from a passion for exceptional
          coffee and a commitment to sustainability. Our founder, after
          traveling the world and experiencing diverse coffee cultures, decided
          to create a space where quality, ethics, and community intertwine.
        </Typography>

        <Typography variant='body' color='gray' className='mb-6'>
          The name 33 represents our philosophy: 3 principles (quality,
          sustainability, community) and 3 commitments (fair trade, organic
          farming, waste reduction). We work directly with small-scale farmers
          to ensure they receive fair compensation while maintaining the highest
          quality standards.
        </Typography>

        <Typography variant='body' color='gray' className='mb-8'>
          Each cup served at 33 Café tells a story - of the farmers who grew the
          beans, the meticulous roasting process, and our baristas dedication to
          the perfect brew. We invite you to be part of this journey and
          experience coffee that not only tastes good but does good.
        </Typography>

        <Button variant='primary'>Learn More About Us</Button>
      </div>
    </div>
  );
};

export default AboutSection;
