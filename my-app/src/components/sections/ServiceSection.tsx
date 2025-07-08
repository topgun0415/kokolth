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
    'text-sm text-[#326537] font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed block mt-2 mb-4 ml-0 mr-0';
  const mobileTypographyStyle =
    'text-sm text-[#326537] font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed block mt-2 mb-4 ml-0 mr-0';

  // 追加のコンテンツ（OPENボタン押下時に表示）
  const expandedContent = (
    <>
      カウンセリングでは不安を吐き出して安心するだけでなくご希望に応じて解決策や行動の方向性を一緒に考えていきます。
      <br />
      <br />
      「どんな答えも自分の中にある」という考えを大切にしながら、傾聴を軸に、フォーカシング・交流分析・認知行動療法などを取り入れてサポートします。あなたらしい「心の在り方」を、一緒に見つけていきましょう。
    </>
  );

  // モバイル用のコンテンツ（改行を強制）
  const mobileServiceContent = (
    <>
      メールを通じて文章のやり取りでカウンセリングを行う「心理支援」です。対面や電話でのカウンセリングと違い、ご自分のペースで好きな時間にスマホでメッセージを送れます。
      <br />
      <br />
      通勤時間やすきま時間を活用できるので気軽にカウンセリングを受けていただけます。言葉をじっくり選べること、あとから読み返して気持ちを整理できることも大きなメリット。対話が苦手な方にも向いています。
    </>
  );

  // デスクトップ用のコンテンツ（改行を最小限に）
  const desktopServiceContent = (
    <>
      メールを通じて文章のやり取りでカウンセリングを行う「心理支援」です。
      <br />
      対面や電話でのカウンセリングと違い、
      <br />
      ご自分のペースで好きな時間にスマホでメッセージを送れます。
      <br />
      <br />
      通勤時間やすきま時間を活用できるので
      気軽にカウンセリングを受けていただけます。
      <br />
      言葉をじっくり選べること、あとから読み返して気持ちを
      整理できることも大きなメリット。
      <br />
      対話が苦手な方にも向いています。
      <br />
      <br />
      カウンセリングでは不安を吐き出して安心するだけでなく
      <br />
      ご希望に応じて解決策や行動の方向性を一緒に考えていきます。
      <br />
      <br />
      「どんな答えも自分の中にある」という考えを大切にしながら、
      <br />
      傾聴を軸に、フォーカシング・交流分析・認知行動療法などを
      取り入れてサポートします。
      <br />
      <br />
      あなたらしい「心の在り方」を、一緒に見つけていきましょう。
    </>
  );

  return (
    <section ref={sectionRef} className='py-8 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col-reverse justify-center items-center lg:flex-row lg:items-start gap-4'>
          <div className='w-full max-w-2xl mx-auto'>
            <div className='text-center md:text-center lg:text-left'>
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
                  className=' mt-7 text-center lg:text-left'>
                  メールカウンセリングとは
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
              <div className='w-full flex justify-center px-6'>
                <div className='w-full max-w-sm pl-4'>
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
              className={`hidden transform transition-all duration-1000 ease-out ${
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
                  <div className='w-full flex justify-center px-6'>
                    <div className='w-full max-w-sm pl-4'>
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
            <div className="relative lg:mr-[50px]">
              {/* Main Image */}
              <Image
                src='/images/handimage.png'
                alt='Counselor'
                className='rounded-lg relative z-10 
                  w-[200px] h-[280px] 
                  md:w-[480px] md:h-[600px] 
                  lg:w-[300px] lg:h-[300px] 
                  xl:w-[200px] xl:h-[300px]'
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
