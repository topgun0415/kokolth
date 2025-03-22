'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '../atoms/Typography';

const IntroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    // Create an Intersection Observer to detect when the section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once the animation is triggered, we can stop observing
            observer.unobserve(sectionElement);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '-100px 0px', // Adjusts the trigger point (optional)
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
        className='relative h-screen flex items-center justify-center overflow-hidden'>
        <div className='text-white space-y-8'>
          <div
            className={`transition-all duration-1000 ease-out transform ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.3s' }}>
            <Typography
              variant='subtitle'
              weight='medium'
              color='primary'
              font='josefin'
              className='leading-relaxed text-center'>
              <strong>高齢出産</strong>、妊活、妊娠、高齢育児、夫婦関係など、
              <br />
              さまざまな不安や心配を抱えている皆さんへ。
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
              variant='subtitle'
              weight='medium'
              color='primary'
              font='josefin'
              className='leading-relaxed text-center'>
              ４８歳での出産経験と、管理栄養士・心理
              <br />
              カウンセラーの資格を持つ私が、
              <br />
              メールカウンセリングでサポートいたします。
            </Typography>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntroSection;
