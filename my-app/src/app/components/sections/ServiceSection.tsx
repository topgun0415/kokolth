'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const ServiceSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
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
            setTimeout(() => setSubtitleVisible(true), 800);
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

  // 共通のスタイル定義
  const typographyStyle =
    'text-xs text-[#326537] font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed';
  const mobileTypographyStyle =
    'text-xs text-[#326537] font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed';
  const highlightStyle =
    'text-[#657811] font-["M_PLUS_1p",sans-serif] font-medium bg-[#e8f0e8] rounded-full';
  const specialHighlightStyle =
    'text-[#657811] font-["M_PLUS_1p",sans-serif] font-medium bg-[#e0eae0] rounded-full';

  // 追加のコンテンツ（OPENボタン押下時に表示）
  const expandedContent = (
    <>
      <br />
      また、対話と違いじっくり言葉を
      <br />
      考えて伝えられることができ、
      <br />
      メッセージを読み直すことで気持ちを
      <br />
      整理できるため、<span className={highlightStyle}>客観的</span>にご自分の
      <br />
      気持ちを<span className={highlightStyle}>俯瞰</span>しやすいカウンセリング
      <br />
      方法です。
      <br />
      <br />
      カウンセリングでは不安を吐き出して
      <br />
      安心するだけでなく、<span className={highlightStyle}>具体的な解決策</span>
      や
      <br />
      <span className={highlightStyle}>行動計画</span>を考えることもできます。
      <br />
      <br />
      <span className={highlightStyle}>心</span>の専門家である
      <span className={highlightStyle}>カウンセラー</span>と一緒に
      <br />
      お気持ちを整理することで、
      <br />
      <span className={highlightStyle}>ご自分の目指す心理状態</span>を
      <span className={highlightStyle}>実現</span>できます。
      <br />
      <br />
      <span className={highlightStyle}>Kokolth</span>では、
      <span className={highlightStyle}>傾聴の姿勢</span>を重要視し、
      <br />
      <span className={specialHighlightStyle}>
        フォーカシング・交流分析・論理療法・
        <br />
        認知療法・認知行動療法
      </span>
      等の心理療法を
      <br />
      取り入れています。
      <br />
      <br />
      <span className={highlightStyle}>
        「どんな問題でも、答えは
        <br />
        自分の心の中にある」
      </span>
      <br />
      という考えを基本とし、
      <br />
      ご自分にとっての最適な答えを
      <br />
      見つけるお手伝いをさせて頂きます。
    </>
  );

  // モバイル用のコンテンツ（改行を強制）
  const mobileServiceContent = (
    <>
      <span className={highlightStyle}>カウンセリングルーム</span>では、
      <br />
      高齢での妊娠や出産に関する
      <br />
      ご質問やお悩み、妊活や不妊治療、
      <br />
      妊娠中の食生活など、幅広く
      <br />
      ご相談いただけます。
      <br />
      <br />
      <span className={highlightStyle}>管理栄養士</span>としての
      <br />
      知識と経験を活かし、栄養面からの
      <br />
      アドバイスも提供いたします。
      <br />
      <br />
      <span className={highlightStyle}>心理カウンセラー</span>として、
      <br />
      心のケアも行います。
      <br />
      <br />
      ご自身の気持ちを整理し、前向きな
      <br />
      気持ちで過ごせるようサポートいたします。
    </>
  );

  // デスクトップ用のコンテンツ（改行を最小限に）
  const desktopServiceContent = (
    <>
      <span className={highlightStyle}>カウンセリングルーム</span>では、
      <span className={highlightStyle}>高齢での妊娠や出産</span>
      に関するご質問やお悩み、
      <span className={specialHighlightStyle}>妊活</span>や
      <span className={specialHighlightStyle}>不妊治療</span>、
      <span className={specialHighlightStyle}>妊娠中の食生活</span>など、
      幅広くご相談いただけます。
      <br />
      <br />
      <span className={highlightStyle}>管理栄養士</span>としての
      <br />
      知識と経験を活かし、
      <br />
      <span className={highlightStyle}>栄養面からのアドバイス</span>も
      <br />
      提供いたします。
      <br />
      <br />
      <span className={highlightStyle}>心理カウンセラー</span>として、
      <br />
      <span className={highlightStyle}>心のケア</span>も行います。
      <br />
      <br />
      <span className={highlightStyle}>ご自身の気持ちを整理</span>し、
      <br />
      <span className={highlightStyle}>前向きな気持ち</span>で
      <br />
      過ごせるようサポートいたします。
      <span className={highlightStyle}>メールを通じて文章のやり取り</span>
      で行うカウンセリングのことで、 カウンセラーとのコミュニケーションを通じた
      <span className={highlightStyle}>心理支援</span>です。
      <br />
      <br />
      対面や電話でのカウンセリングと違い、
      <span className={highlightStyle}>ご自分のペース</span>で好きな時間に
      スマホでメッセージを送れます。
      <br />
      <br />
      通勤時間やちょっとした空き時間を活用できるので
      <span className={highlightStyle}>気軽</span>にカウンセリングを
      受けていただけます。
      <br />
      <br />
      また、対話と違いじっくり言葉を考えて伝えられることができ、
      メッセージを読み直すことで気持ちを整理できるため、
      <span className={highlightStyle}>客観的</span>にご自分の 気持ちを
      <span className={highlightStyle}>俯瞰</span>
      しやすいカウンセリング方法です。
      <br />
      <br />
      カウンセリングでは不安を吐き出して安心するだけでなく、
      <span className={highlightStyle}>具体的な解決策</span>や
      <span className={highlightStyle}>行動計画</span>を考えることもできます。
      <br />
      <br />
      <span className={highlightStyle}>心</span>の専門家である
      <span className={highlightStyle}>カウンセラー</span>
      と一緒にお気持ちを整理することで、
      <br />
      <span className={highlightStyle}>ご自分の目指す心理状態</span>を
      <br />
      <span className={highlightStyle}>実現</span>できます。
      <br />
      <br />
      <span className={highlightStyle}>Kokolth</span>では、
      <span className={highlightStyle}>傾聴の姿勢</span>を重要視し、
      <span className={specialHighlightStyle}>
        フォーカシング・交流分析・論理療法・認知療法・認知行動療法
      </span>
      等の心理療法を 取り入れています。
      <br />
      <br />
      <span className={highlightStyle}>
        「どんな問題でも、答えは自分の心の中に ある」
      </span>
      という考えを基本とし、ご自分にとっての最適な答えを見つけるお手伝いを
      させて頂きます。
    </>
  );

  return (
    <section ref={sectionRef} className='py-16 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col-reverse justify-center items-center lg:flex-row lg:items-start gap-8'>
          <div className='w-full max-w-2xl mx-auto'>
            <div className='text-center md:text-center lg:text-center'>
              <div
                className={`transform transition-all duration-1000 ease-out ${
                  subtitleVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
                <Typography
                  variant='h3'
                  weight='medium'
                  color='primary'
                  className=' mt-7 text-center'>
                  メールカウンセリング
                </Typography>
              </div>
            </div>

            <br />

            {/* Mobile Content */}
            <div
              className={`lg:hidden w-full transform transition-all duration-1000 ease-out ${
                contentVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}>
              <div className='w-full flex justify-center px-4'>
                <div className='w-full max-w-lg pl-6'>
                  <Typography
                    variant='body'
                    weight='regular'
                    color='primary'
                    className={mobileTypographyStyle}>
                    {mobileServiceContent}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Tablet Content */}
            <div
              className={`hidden lg:hidden md:block transform transition-all duration-1000 ease-out ${
                contentVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}>
              <div className='w-full flex justify-center px-4'>
                <div className='w-full max-w-lg pl-6'>
                  <Typography
                    variant='body'
                    weight='regular'
                    color='primary'
                    className={mobileTypographyStyle}>
                    {mobileServiceContent}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Desktop Content */}
            <div
              className={`hidden lg:block transform transition-all duration-1000 ease-out ${
                contentVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}>
              <div className='w-full max-w-3xl'>
                <Typography
                  variant='body'
                  weight='regular'
                  color='primary'
                  className={typographyStyle}>
                  {desktopServiceContent}
                </Typography>
              </div>
            </div>

            {/* Mobile Expand Button */}
            <div className='lg:hidden relative transform transition-all duration-1000 ease-out'>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className='w-full'>
                  <div className='w-full flex justify-center px-4'>
                    <div className='w-full max-w-lg pl-6'>
                      <Typography
                        variant='body'
                        weight='regular'
                        color='primary'
                        className={mobileTypographyStyle}>
                        {expandedContent}
                      </Typography>
                    </div>
                  </div>
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
            className={`sm:mt-20 transform transition-all duration-1000 ease-out ${
              imageVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            <Image
              src='/images/email.jpg'
              alt='Counselor'
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
