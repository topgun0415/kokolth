'use client';

import React, { useEffect, useRef, useState } from 'react';
import ProcessCard from '../molecules/ProcessCard';
import { Typography } from '../atoms/Typography';

const ProcessSection: React.FC = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setTitleVisible(true), 200);

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
    <section ref={sectionRef} className='py-12 bg-gray-100'>
      <div className='text-center mb-12'>
        <div
          className={`transform transition-all duration-1000 ease-out ${
            titleVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}>
          <Typography
            variant='h4'
            weight='medium'
            color='primary'
            font='yugothic-medium'
            className='mb-10 text-center'>
            メールカウンセリングの進め方
          </Typography>
        </div>

        {/* ProcessCard Container */}
        <div className='mx-auto max-w-4xl'>
          <div className='bg-gray-150 rounded-lg overflow-hidden'>
            <ProcessCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
