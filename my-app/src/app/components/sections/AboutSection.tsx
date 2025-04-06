'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setImageVisible(true), 200);
            setTimeout(() => setHeadingVisible(true), 500);
            setTimeout(() => setContentVisible(true), 1100);

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
    <>
      <section ref={sectionRef} className='py-16 bg-transparent'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col-reverse justify-between items-center lg:flex-row lg:items-start'>
            <div className='mb-5 max-w-2xl'>
              <div className='text-center lg:text-left'>
                <div className='flex items-center justify-center lg:justify-between gap-10'>
                  <div
                    className={`transform transition-all duration-1000 ease-out ${
                      headingVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}>
                    <Typography
                      variant='h3'
                      weight='medium'
                      color='primary'
                      font='yugothic-medium'
                      className=' mt-7 text-center'>
                      ご挨拶
                    </Typography>
                  </div>

                  <div
                    className={`rounded-full overflow-hidden border-2 border-gray-100 shadow-sm transform transition-all duration-1000 ease-out sm:hidden ${
                      imageVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}
                    style={{ width: 115, height: 115 }}>
                    <Image
                      src='/images/aboutImage.jpeg'
                      alt='Profile'
                      width={150}
                      height={150}
                      className='object-cover'
                    />
                  </div>
                </div>
              </div>

              <br />

              {/* Mobile Content */}
              <div
                className={`lg:hidden transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
                <Typography
                  variant='caption'
                  weight='medium'
                  color='primary'
                  font='yugothic-regular'
                  className='max-w-lg text-left text-[12px]'>
                  はじめまして！
                  <br />
                  管理栄養士、心理カウンセラーの石松寿子と申します。
                  ４８歳の時に次男を出産し、高齢出産を希望される方の
                  ご参考になることを目指してスレッズにて発信をしておりましたが、
                  この度、さらに細かいご質問やお悩みに、個人的に詳しく丁寧にお答えしながら
                  皆さんの人生に寄り添える存在になれればと
                  カウンセリングルームを開設いたしました。
                </Typography>
              </div>

              {/* Desktop Content */}
              <div
                className={`hidden lg:block transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
                <Typography
                  variant='caption'
                  weight='medium'
                  color='primary'
                  font='yugothic-regular'
                  className='max-w-lg text-left'>
                  はじめまして！
                  <br />
                  管理栄養士、心理カウンセラーの石松寿子と申します。
                  <br />
                  ４８歳の時に次男を出産し、高齢出産を希望される方の
                  <br />
                  ご参考になることを目指してスレッズにて発信をしておりましたが、
                  <br />
                  この度、さらに細かいご質問やお悩みに、個人的に詳しく丁寧にお答えしながら
                  <br />
                  皆さんの人生に寄り添える存在になれればとカウンセリングルームを開設いたしました。
                </Typography>
              </div>

              {/* Desktop extended content with animation */}
              <div
                className={`hidden lg:block transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
                <Typography
                  variant='caption'
                  weight='medium'
                  color='primary'
                  font='yugothic-regular'
                  className='max-w-lg text-left'>
                  <br />
                  高齢での妊娠や出産はセンシティブな内容ゆえに、
                  <br />
                  誰にでもなんでも相談できるわけではありません。
                  <br />
                  今不安な気持ちや迷いでもやもやした思いを抱えているという方、
                  <br />
                  ご自分の状況やお気持ち、ご質問をどうぞメールでお聞かせください。
                  <br />
                  こんなこと聞いたら失礼かなとか、不謹慎かなという心配は不要です。
                  <br />
                  どんな内容でも、しっかりと受け止めさせて頂きます。
                  <br />
                  ご参考までに、私の考えや経験も少しお伝えいたします。
                  <br />
                  その上で、ご自分の望む未来へ、一緒に進んでいきましょう。
                  <br />
                  管理栄養士が本職なので、食生活に関するご質問も大歓迎です。
                  <br />
                  <br />
                  カウンセラーは心の専門家であると同時に
                  <br />
                  相談された方の最大の味方でもあります。
                  <br />
                  皆様のお気持ちがすっきりして、爽快な気分で生きていかれますよう
                  <br />
                  全力で応援いたします。
                </Typography>
              </div>

              <div
                className={`lg:hidden mt-4 relative transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}>
                    <Typography
                      variant='caption'
                      weight='medium'
                      color='primary'
                      font='yugothic-regular'
                      className='max-w-lg mt-2 text-left text-[12px]'>
                      <br />
                      高齢での妊娠や出産はセンシティブな内容ゆえに、誰にでもなんでも
                      相談できるわけではありません。今不安な気持ちや迷いでもやもやした思いを抱えている方、
                      ご自分の状況やお気持ち、ご質問をどうぞメールでお聞かせください。
                      <br />
                      <br />
                      こんなこと聞いたら失礼かなとか、不謹慎かなという心配は不要です。
                      どんな内容でも、しっかりと受け止めさせて頂きます。
                      ご参考までに、私の考えや経験も少しお伝えいたします。
                      <br />
                      <br />
                      その上で、ご自分の望む未来へ、一緒に進んでいきましょう。
                      管理栄養士が本職なので、食生活に関するご質問も大歓迎です。
                      <br />
                      <br />
                      カウンセラーは心の専門家であると同時に
                      相談された方の最大の味方でもあります。
                      皆様のお気持ちがすっきりして、爽快な気分で生きていかれますよう
                      全力で応援いたします。
                    </Typography>
                  </motion.div>
                )}

                <div className='relative flex justify-center mt-10 mb-5'>
                  <button
                    className='flex items-center text-primary font-medium'
                    onClick={() => setIsExpanded(!isExpanded)}>
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}>
                      {isExpanded ? 'CLOSE' : 'OPEN'}
                    </motion.span>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className='ml-2 flex justify-center items-center'>
                      {isExpanded ? (
                        <MinusIcon className='w-6 h-6' />
                      ) : (
                        <PlusIcon className='w-6 h-6' />
                      )}
                    </motion.div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`hidden md:block md:mt-20 transform transition-all duration-1000 ease-out ${
                imageVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}>
              <Image
                src='/images/aboutImage.jpeg'
                alt='About Us'
                width={350}
                height={350}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
