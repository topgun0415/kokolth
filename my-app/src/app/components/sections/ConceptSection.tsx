'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '../atoms/Typography';

const ConceptSection: React.FC = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [lineVisibility, setLineVisibility] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
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

  const conceptLines = [
    '高齢出産、妊活中、妊娠中、高齢育児、夫婦関係について',
    '不安やつらい気持ちを抱えている全ての方に',
    '４８歳での出産を経験した',
    '管理栄養士でもある心理カウンセラーが',
    'メールカウンセリングでご支援いたします',
  ];

  return (
    <>
      <section ref={sectionRef} className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='h-[40vh] text-center'>
            <div className='mb-5'>
              <div
                className={`transform transition-all duration-1000 ease-out ${
                  titleVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
                <Typography
                  variant='h2'
                  weight='medium'
                  color='primary'
                  font='josefin'>
                  CONCEPT
                </Typography>
              </div>

              <div
                className={`transform transition-all duration-1000 ease-out ${
                  subtitleVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
                <Typography
                  variant='subtitle'
                  weight='medium'
                  color='primary'
                  font='josefin'
                  className='mb-10'>
                  コンセプト
                </Typography>
              </div>

              <br />

              {conceptLines.map((line, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-800 ease-out ${
                    lineVisibility[index]
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}>
                  <Typography
                    variant='subtitle'
                    weight='medium'
                    color='primary'
                    font='josefin'
                    className='leading-relaxed text-center text-sm sm:text-sm md:text-lg lg:text-xl mb-4'>
                    {line}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConceptSection;
