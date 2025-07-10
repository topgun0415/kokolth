'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '../atoms/Typography';

const PriceSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), 200);
            setTimeout(() => setContentVisible(true), 800);
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

  const priceItems = [
    {
      icon: '🔸',
      title: '初回お試しプラン（メール1往復）',
      price: '1,000円（税込）',
      note: '※初回のみ'
    },
    {
      icon: '🔸',
      title: '通常プラン（メール1往復）',
      price: '2,000円（税込）',
      note: ''
    },
    {
      icon: '🔸',
      title: '継続サポート3回パック（メール３往復）',
      price: '5,000円（税込）',
      note: ''
    }
  ];

  return (
    <section
      ref={sectionRef}
      className='py-12 sm:py-16 md:py-20 bg-gray-100'>
      <div className='container mx-auto px-4 sm:px-6 md:px-8'>
        {/* Header Section */}
        <div className='text-center mb-8 sm:mb-12'>
          <div
            className={`transform transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            <Typography
              variant='h3'
              weight='medium'
              color='primary'
              className='mb-6 text-center'>
              料金について
            </Typography>
          </div>
        </div>

        {/* Content Section */}
        <div className='max-w-4xl mx-auto'>
          <div
            className={`transform transition-all duration-1000 ease-out ${
              contentVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            <Typography
              variant='body'
              weight='regular'
              color='primary'
              className='text-center mb-8 sm:mb-12 text-sm font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed'>
              以下のプランからご希望の
              <br />
              コースをお選びください
            </Typography>
          </div>

          {/* Price Items */}
          <div className='space-y-6 sm:space-y-8 mb-8 sm:mb-12'>
            {priceItems.map((item, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${1000 + index * 200}ms` 
                }}>
                <div className='bg-white rounded-lg shadow-sm p-6 sm:p-8 mx-auto max-w-2xl'>
                  <div className='flex items-start space-x-4'>
                    <span className='text-2xl sm:text-3xl mt-1 flex-shrink-0'>
                      {item.icon}
                    </span>
                    <div className='flex-1 min-w-0'>
                      <Typography
                        variant='body'
                        weight='medium'
                        color='primary'
                        className='text-base sm:text-lg font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed mb-2'>
                        {item.title}
                      </Typography>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <Typography
                          variant='body'
                          weight='bold'
                          color='primary'
                          className='text-lg sm:text-xl font-["M_PLUS_1p",sans-serif] tracking-wide'>
                          {item.price}
                        </Typography>
                        {item.note && (
                          <Typography
                            variant='body'
                            weight='regular'
                            color='primary'
                            className='text-sm font-["M_PLUS_1p",sans-serif] tracking-wide text-[#666]'>
                            {item.note}
                          </Typography>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Message */}
          <div
            className={`transform transition-all duration-1000 ease-out ${
              contentVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              transitionDelay: `${1000 + priceItems.length * 200 + 300}ms` 
            }}>
            <div className='text-center'>
              <Typography
                variant='body'
                weight='regular'
                color='primary'
                className='text-sm font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed'>
                カウンセリング内容やご不安な点など、
                <br />
                どうぞお気軽にLINEからご相談くださいませ
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;