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

  // 共通のスタイル定義
  const typographyStyle =
    'text-xs text-[#326537] font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed';
  const mobileTypographyStyle =
    'text-xs text-[#326537] font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed';
  const highlightStyle = 'text-[#657811] font-["M_PLUS_1p",sans-serif] font-medium bg-[#e8f0e8] rounded-full';
  const specialHighlightStyle = 'text-[#657811] font-["M_PLUS_1p",sans-serif] font-medium bg-[#e0eae0] rounded-full';

  // 共通のコンテンツ
  const aboutContent = (
    <>
      はじめまして！
      <br />
      <br />
      <span className={highlightStyle}>
        管理栄養士、心理カウンセラー</span>の<span className={highlightStyle}>石松寿子</span>と申します。
      <br />
      <br />
      <span className={highlightStyle}>４８歳</span>の時に次男を出産し、
      <span className={highlightStyle}>高齢出産</span>を希望される方のご参考に
      なることを目指して<span className={highlightStyle}>スレッズ</span>にて
      発信をしておりましたが、この度、
      さらに細かいご質問やお悩みに、
      個人的に詳しく丁寧にお答えしながら
      皆さんの人生に寄り添える存在に
      なれればと<span className={highlightStyle}>カウンセリングルームを
      開設</span>いたしました。
    </>
  );

  // 追加のコンテンツ（OPENボタン押下時に表示）
  const expandedContent = (
    <>
      <span className={highlightStyle}>高齢での妊娠や出産</span>は<span className={highlightStyle}>センシティブな
      内容</span>ゆえに、誰にでもなんでも相談
      できるわけではありません。
      <br />
      <br />
      <span className={highlightStyle}>今不安な気持ちや迷いでもやもやした
      思いを抱えているという方</span>、
      ご自分の状況やお気持ち、ご質問を
      どうぞメールでお聞かせください。
      <br />
      <br />
      <span className={highlightStyle}>
      こんなこと聞いたら失礼かなとか、
      不謹慎かなという心配は不要です</span>。
      <br />
      <br />
      どんな内容でも、しっかりと受け止め
      させて頂きます。
      ご参考までに、私の考えや経験も
      少しお伝えいたします。
      その上で、ご自分の望む<span className={highlightStyle}>未来</span>へ、
      一緒に進んでいきましょう。
      <br />
      <br />
      <span className={highlightStyle}>
      管理栄養士</span>が本職なので、食生活に
      関するご質問も大歓迎です。
      <br />
      <br />
      <span className={highlightStyle}>
      カウンセラーは心の専門家であると
      同時に相談された方の最大の味方でも
      あります</span>。
      <br />
      <br />
      皆様のお気持ちがすっきりして、
      爽快な気分で生きていかれますよう
      全力で<span className={highlightStyle}>応援</span>いたします。
    </>
  );

  // モバイル用のコンテンツ（改行を強制）
  const mobileAboutContent = (
    <>
      はじめまして！
      <br />
      <br />
      <span className={highlightStyle}>管理栄養士、心理カウンセラー</span>の
      <br />
      <span className={highlightStyle}>石松寿子</span>と申します。
      <br />
      <br />
      <span className={highlightStyle}>４８歳</span>の時に次男を出産し、
      <br />
      <span className={highlightStyle}>高齢出産</span>を希望される方のご参考に
      <br />
      なることを目指して<span className={highlightStyle}>スレッズ</span>にて
      <br />
      発信をしておりましたが、この度、
      <br />
      さらに細かいご質問やお悩みに、
      <br />
      個人的に詳しく丁寧にお答えしながら
      <br />
      皆さんの人生に寄り添える存在に
      <br />
      なれればと<span className={highlightStyle}>カウンセリングルームを
      <br />
      開設</span>いたしました。
    </>
  );

  // モバイル用の展開コンテンツ（改行を強制）
  const mobileExpandedContent = (
    <>
      <br />
      <span className={highlightStyle}>高齢での妊娠や出産</span>は
      <br />
      <span className={highlightStyle}>センシティブな内容</span>ゆえに、
      <br />
      誰にでもなんでも相談できるわけでは
      <br />
      ありません。
      <br />
      <br />
      <span className={highlightStyle}>今不安な気持ちや迷いでもやもやした
      <br />
      思いを抱えているという方</span>、
      <br />
      ご自分の状況やお気持ち、ご質問を
      <br />
      どうぞメールでお聞かせください。
      <br />
      <br />
      <span className={highlightStyle}>こんなこと聞いたら失礼かなとか、
      <br />
      不謹慎かなという心配は不要です</span>。
      <br />
      <br />
      どんな内容でも、しっかりと受け止め
      <br />
      させて頂きます。
      <br />
      ご参考までに、私の考えや経験も
      <br />
      少しお伝えいたします。
      <br />
      その上で、ご自分の望む<span className={highlightStyle}>未来</span>へ、
      <br />
      一緒に進んでいきましょう。
      <br />
      <br />
      <span className={highlightStyle}>管理栄養士</span>が本職なので、
      <br />
      食生活に関するご質問も大歓迎です。
      <br />
      <br />
      <span className={highlightStyle}>カウンセラーは心の専門家であると
      <br />
      同時に相談された方の最大の味方でも
      <br />
      あります</span>。
      <br />
      <br />
      皆様のお気持ちがすっきりして、
      <br />
      爽快な気分で生きていかれますよう
      <br />
      全力で<span className={highlightStyle}>応援</span>いたします。
    </>
  );

  return (
    <>
      <section ref={sectionRef} className='py-16 bg-transparent'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col-reverse justify-center items-center lg:flex-row lg:items-start gap-8'>
            <div className='w-full max-w-2xl mx-auto'>
              <div className='text-center'>
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
                      font='noto-medium'
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

              {/* モバイル表示 */}
              <div
                className={`lg:hidden w-full transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
                <div className="w-full flex justify-center px-4">
                  <div className="w-full max-w-lg pl-6">
                    <Typography
                      variant='body'
                      weight='regular'
                      color='primary'
                      font='noto-medium'
                      className={mobileTypographyStyle}>
                      {mobileAboutContent}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* デスクトップ表示 */}
              <div
                className={`hidden lg:block transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
                <div className="w-full max-w-3xl">
                  <Typography
                    variant='body'
                    weight='regular'
                    color='primary'
                    font='noto-medium'
                    className={typographyStyle}>
                    {aboutContent}
                  </Typography>
                </div>
              </div>

              {/* モバイル表示の展開部分 */}
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
                    transition={{ duration: 0.4 }}
                    className="w-full">
                    <div className="w-full flex justify-center px-4">
                      <div className="w-full max-w-lg pl-6">
                        <Typography
                          variant='body'
                          weight='regular'
                          color='primary'
                          font='noto-medium'
                          className={mobileTypographyStyle}>
                          {mobileExpandedContent}
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

              {/* デスクトップ表示の展開部分 */}
              <div
                className={`hidden lg:block mt-4 relative transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full">
                    <div className="w-full max-w-3xl">
                      <Typography
                        variant='body'
                        weight='regular'
                        color='primary'
                        font='noto-medium'
                        className={typographyStyle}>
                        {expandedContent}
                      </Typography>
                    </div>
                  </motion.div>
                )}
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


