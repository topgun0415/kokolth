'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '../atoms/Typography';

const ConceptSection: React.FC = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [lineVisibility, setLineVisibility] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [buttonVisible, setButtonVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setTitleVisible(true), 200);
            setTimeout(() => setButtonVisible(true), 500);

            lineVisibility.forEach((_, index) => {
              setTimeout(() => {
                setLineVisibility((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, 1000 + index * 300);
            });

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

  const conceptButtons = [
    '高齢出産',
    '妊活中',
    '妊娠中',
    '高齢育児',
    '夫婦関係',
    '心の不安',
  ];

  const conceptLines = [
    '高齢出産、妊活中、妊娠中、高齢育児、',
    '夫婦関係について',
    '不安やつらい気持ちを抱えている全ての方に',
    '４８歳での出産を経験した',
    '管理栄養士でもある心理カウンセラーが',
    'メールカウンセリングでご支援いたします',
  ];

  return (
    <section
      ref={sectionRef}
      className='py-12 sm:py-16 md:py-20 bg-transparent'>
      <div className='container mx-auto px-4 sm:px-6 md:px-8'>
        {/* Header Section */}
        <div className='text-center mb-8 sm:mb-12'>
          <div
            className={`transform transition-all duration-1000 ease-out ${
              titleVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            <Typography
              variant='h3'
              weight='medium'
              color='primary'
              font='yugothic-medium'
              className='mb-6 text-center'>
              コンセプト
            </Typography>
          </div>
        </div>

        {/* Concern Buttons Section */}
        <div className='max-w-2xl mx-auto mb-10'>
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-1000 ease-out ${
              buttonVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            {conceptButtons.map((btnText, index) => (
              <button
                key={index}
                className='text-sm sm:text-base font-medium py-2 px-4 rounded-full border border-primary text-primary hover:bg-primary transition-all duration-300'>
                {btnText}
              </button>
            ))}
          </div>
        </div>

        {/* Concept Lines */}
        <div className='max-w-3xl mx-auto'>
          {conceptLines.map((line, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 ease-out ${
                lineVisibility[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}>
              <Typography
                variant='caption'
                color='primary'
                font='yugothic-regular'
                className='leading-relaxed text-center mb-3 sm:mb-4 md:mb-6 block'>
                {line}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
