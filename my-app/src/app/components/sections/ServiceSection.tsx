'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const ServiceSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
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
            setTimeout(() => setHeadingVisible(true), 500);
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

  return (
    <>
      <section ref={sectionRef} className='py-16 bg-gray-100'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col-reverse justify-between items-center lg:flex-row lg:items-start'>
            <div className='mb-5 max-w-2xl'>
              <div className='text-center lg:text-left'>
                <div
                  className={`transform transition-all duration-1000 ease-out ${
                    headingVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}>
                  <Typography
                    variant='h2'
                    weight='medium'
                    color='primary'
                    font='josefin'
                    className='mt-10 lg:mt-0'>
                    OUR SERVICE
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
                    className='max-w-lg'>
                    メールカウンセリングとは
                  </Typography>
                </div>
              </div>

              <br />

              <div
                className={`transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
                <Typography
                  variant='caption'
                  weight='medium'
                  color='primary'
                  font='josefin'
                  className='max-w-lg text-left'>
                  メールを通じて文章のやり取りで行うカウンセリングのことで、
                  <br />
                  カウンセラーとのコミュニケーションを通じた「心理支援」です。
                  <br />
                  対面や電話でのカウンセリングと違い、
                  <br />
                  ご自分のペースで好きな時間にスマホでメッセージを送れます。
                  <br />
                  通勤時間やちょっとした空き時間を活用できるので、
                  <br />
                  気軽にカウンセリングを受けていただけます。
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
                  font='josefin'
                  className='max-w-lg text-left'>
                  <br />
                  また、対話と違いじっくり言葉を考えて伝えられることができ、
                  <br />
                  メッセージを読み直すことで気持ちを整理できるため、
                  <br />
                  客観的にご自分の気持ちを俯瞰しやすいカウンセリング方法です。
                  <br />
                  カウンセリングでは不安を吐き出して安心するだけでなく、
                  <br />
                  具体的な解決策や行動計画を考えることもできます。
                  <br />
                  <br />
                  心の専門家であるカウンセラーと一緒にお気持ちを整理することで、
                  <br />
                  着実にご自分の目指す心理状態を実現できます。
                  <br />
                  カウンセリングでは不安を吐き出して安心するだけでなく、具体的な解決策や
                  <br />
                  行動計画を考えることもできます。心の専門家であるカウンセラーと一緒に
                  <br />
                  お気持ちを整理することで、着実にご自分の目指す心理状態を実現できます。
                  <br />
                  <br />
                  Kokolthでは、傾聴の姿勢を重要視し、フォーカシング・交流分析・
                  <br />
                  論理療法・認知療法・認知行動療法等の心理療法を取り入れています。
                  <br />
                  「どんな問題でも、答えは自分の心の中にある」という考えを基本とし、
                  <br />
                  ご自分にとっての最適な答えを見つけるお手伝いをさせて頂きます。
                </Typography>
              </div>

              <div
                className={`lg:hidden mt-4 relative transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
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
                      font='josefin'
                      className='max-w-lg mt-2 text-left'>
                      <br />
                      また、対話と違いじっくり言葉を考えて伝えられることができ、
                      <br />
                      メッセージを読み直すことで気持ちを整理できるため、客観的に
                      <br />
                      ご自分の気持ちを俯瞰しやすいカウンセリング方法です。
                      <br />
                      カウンセリングでは不安を吐き出して安心するだけでなく、
                      <br />
                      具体的な解決策や行動計画を考えることもできます。
                      <br />
                      <br />
                      心の専門家であるカウンセラーと一緒にお気持ちを整理することで、
                      着実にご自分の目指す心理状態を実現できます。
                      <br />
                      カウンセリングでは不安を吐き出して安心するだけでなく、具体的な解決策や
                      行動計画を考えることもできます。心の専門家であるカウンセラーと一緒に
                      お気持ちを整理することで、着実にご自分の目指す心理状態を実現できます。
                      <br />
                      <br />
                      Kokolthでは、傾聴の姿勢を重要視し、フォーカシング・交流分析・
                      論理療法・認知療法・認知行動療法等の心理療法を取り入れています。
                      「どんな問題でも、答えは自分の心の中にある」という考えを基本とし、
                      ご自分にとっての最適な答えを見つけるお手伝いをさせて頂きます。
                    </Typography>
                  </motion.div>
                )}
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
    </>
  );
};

export default ServiceSection;
