'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '../atoms/Typography';

const IntroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            observer.unobserve(sectionElement);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px',
      }
    );

    observer.observe(sectionElement);

    // Clean up the observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className=' h-96 flex items-center justify-center overflow-hidden'>
        <div className='text-white space-y-8'>
          <div
            className={`transition-all duration-1000 ease-out transform ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.3s' }}>
            <Typography
              variant='body'
              weight='medium'
              color='primary'
              font='josefin'
              className='leading-relaxed text-center'>
              高齢出産、妊活中、妊娠中、高齢育児、夫婦関係について
            </Typography>
            <br />
            <Typography
              variant='body'
              weight='medium'
              color='primary'
              font='josefin'
              className='leading-relaxed text-center'>
              不安やつらい気持ちを抱えている全ての方に
            </Typography>
          </div>
          <div
            className={`transition-all duration-1000 ease-out transform ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.6s' }}>
            <Typography
              variant='body'
              weight='medium'
              color='primary'
              font='josefin'
              className='leading-relaxed text-center'>
              48歳で出産を経験した
            </Typography>
            <br />
            <Typography
              variant='body'
              weight='medium'
              color='primary'
              font='josefin'
              className='leading-relaxed text-center'>
              管理栄養士でもある心理カウンセラーが
            </Typography>
            <br />
            <Typography
              variant='body'
              weight='medium'
              color='primary'
              font='josefin'
              className='leading-relaxed text-center'>
              メールカウンセリングでご支援いたします。
            </Typography>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntroSection;
