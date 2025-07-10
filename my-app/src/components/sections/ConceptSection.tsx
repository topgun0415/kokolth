'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '../atoms/Typography';

const ConceptSection: React.FC = () => {
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
        threshold: 0.2,
        rootMargin: '-50px 0px',
      }
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // PC用のテキスト（3行）
  const conceptLinesDesktop = [
    '高齢出産、妊活中、妊娠中、高齢育児、夫婦関係について',
    '不安やつらい気持ちを抱えている全ての方に',
    '４８歳での出産を経験した管理栄養士でもある心理カウンセラーが',
    'メールカウンセリングでご支援いたします'
  ];

  // モバイル用のテキスト（従来通り）
  const conceptLinesMobile = [
    '高齢出産、妊活中、妊娠中',
    '高齢育児、夫婦関係について',
    '不安やつらい気持ちを抱えている',
    '全ての方に ４８歳での出産を経験した',
    '管理栄養士でもある心理カウンセラーが',
    'メールカウンセリングで',
    'ご支援いたします'
  ];

  return (
    <section
      ref={sectionRef}
      className='py-12 sm:py-16 md:py-20 bg-transparent'>
      <div className='container mx-auto px-4 sm:px-6 md:px-8'>
        {/* Header Section */}
        <div className='text-center mb-8 sm:mb-12'>
          <div
            className={`transform transition-all duration-1000 ease-out delay-200 ${
              isVisible
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

        {/* Concept Lines - Desktop */}
        <div className='max-w-4xl mx-auto hidden md:block'>
          {conceptLinesDesktop.map((line, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${1000 + index * 300}ms` 
              }}>
              <Typography
                variant='h4'
                weight='regular'
                color='primary'
                font='yugothic-regular'
                className='leading-relaxed text-center mb-4 md:mb-6 lg:mb-8 block text-lg md:text-xl lg:text-2xl'>
                {line}
              </Typography>
            </div>
          ))}
        </div>

        {/* Concept Lines - Mobile */}
        <div className='max-w-3xl mx-auto md:hidden'>
          {conceptLinesMobile.map((line, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${1000 + index * 300}ms` 
              }}>
              <Typography
                variant='body'
                weight='bold'
                color='primary'
                font='yugothic-regular'
                className='leading-relaxed text-center mb-3 sm:mb-4 block'>
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
