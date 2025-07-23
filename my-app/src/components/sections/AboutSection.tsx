"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Typography } from "../atoms/Typography";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

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
        rootMargin: "-50px 0px",
      }
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 共通のスタイル定義
  const typographyStyle =
    'text-sm text-[#326537] font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed block mt-2 mb-2 ml-0 mr-0';
  const mobileTypographyStyle =
    'text-sm text-[#326537] font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed block mt-2 mb-2 ml-0 mr-0';

  // 共通のコンテンツ
  const aboutContent = <>
  はじめまして。
      <br />
      管理栄養士、心理カウンセラーのhisakoと申します。
      <br />
      48歳の時に次男を出産し、現在50歳で2歳を育てています。
      <br />
      いろんな方の参考になればとスレッズでの発信をしておりましたが、
      <br />
      さらにお一人おひとりの悩みに丁寧に寄り添えるよう
      この度カウンセリングルームを開設いたしました。
      <br />
      <br />
      高齢での妊娠や出産、育児、夫婦関係のことは
      誰にでも相談できるわけではありません。
      <br />
      今、何かの不安や迷いでもやもやしている方、
      ご自分の状況やお気持ち、ご質問をメールでなんでもお話しください。
      こんなこと聞いたら失礼かなとか、不謹慎かなという心配は不要です。
      <br />
      どんな内容でも、しっかりと受け止めさせて頂き、
      必要に応じて私の考えや経験もお伝えいたします。
      <br />
      <br />
      あなたがご自身の望む未来へ向かって、少しでも軽やかな
      一歩を踏み出せるよう、共に考えてまいります。
      <br />
      管理栄養士が本職なので、食生活に関するご質問も大歓迎です。
      カウンセラーは心の専門家であると同時に 相談者様のいちばんの味方です。
      <br />
      <br />
      皆様のお気持ちがすっきりして、毎日を心地よく過ごせるよう全力でサポートいたします。
  </>;

  // モバイル用のコンテンツ（改行を強制）
  const mobileAboutContent = (
    <>
      はじめまして。
      <br />
      管理栄養士、心理カウンセラーのhisakoと申します。48歳の時に次男を出産し、現在50歳で2歳を育てています。
      <br />
      <br />
      いろんな方の参考になればとスレッズでの発信をしておりましたが、さらにお一人おひとりの悩みに丁寧に寄り添えるようこの度カウンセリングルームを開設いたしました。
    </>
  );

  // モバイル用の展開コンテンツ（改行を強制）
  const mobileExpandedContent = (
    <>
      高齢での妊娠や出産、育児、夫婦関係のことは誰にでも相談できるわけではありません。
      今、何かの不安や迷いでもやもやしている方、ご自分の状況やお気持ち、ご質問をメールでなんでもお話しください。
      <br />
      <br />
      こんなこと聞いたら失礼かなとか、不謹慎かなという心配は不要です。どんな内容でも、しっかりと受け止めさせて頂き、
      必要に応じて私の考えや経験もお伝えいたします。
      <br />
      <br />
      あなたがご自身の望む未来へ向かって、少しでも軽やかな一歩を踏み出せるよう、共に考えてまいります。
      <br />
      <br />
      管理栄養士が本職なので、食生活に関するご質問も大歓迎です。カウンセラーは心の専門家であると同時に 相談者様のいちばんの味方です。
      <br />
      <br />
      皆様のお気持ちがすっきりして、毎日を心地よく過ごせるよう全力でサポートいたします。
    </>
  );

  return (
    <>
      <section ref={sectionRef} className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse justify-center items-center lg:flex-row lg:items-start gap-8">
            <div className="w-full max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center lg:justify-between gap-10">
                  <div
                    className={`transform transition-all duration-1000 ease-out ${
                      headingVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <Typography
                      variant="h3"
                      weight="medium"
                      color="primary"
                      className=" mt-7 text-center"
                    >
                      ご挨拶
                    </Typography>
                  </div>

                  <div
                    className={`rounded-full overflow-hidden border-2 border-gray-100 shadow-sm transform transition-all duration-1000 ease-out sm:hidden ${
                      imageVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ width: 115, height: 115 }}
                  >
                    <Image
                      src="/images/aboutImage.jpeg"
                      alt="Profile"
                      width={150}
                      height={150}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <br />

              {/* モバイル表示 */}
              <div
                className={`lg:hidden w-full transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="w-full flex justify-center px-4">
                  <div className="w-full max-w-lg pl-6">
                    <Typography
                      variant="body"
                      weight="regular"
                      color="primary"
                      className={mobileTypographyStyle}
                    >
                      {mobileAboutContent}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* デスクトップ表示 */}
              <div
                className={`hidden lg:block transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="w-full max-w-3xl">
                  <Typography
                    variant="body"
                    weight="regular"
                    color="primary"
                    className={typographyStyle}
                  >
                    {aboutContent}
                  </Typography>
                </div>
              </div>

              {/* モバイル表示の展開部分 */}
              <div
                className={`lg:hidden mt-4 relative transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <div className="w-full flex justify-center px-4">
                      <div className="w-full max-w-lg pl-6">
                        <Typography
                          variant="body"
                          weight="regular"
                          color="primary"
                          className={mobileTypographyStyle}
                        >
                          {mobileExpandedContent}
                        </Typography>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="relative flex justify-center mt-10 mb-5">
                  <button
                    className="flex items-center text-primary font-medium"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isExpanded ? "CLOSE" : "OPEN"}
                    </motion.span>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-2 flex justify-center items-center"
                    >
                      {isExpanded ? (
                        <MinusIcon className="w-6 h-6" />
                      ) : (
                        <PlusIcon className="w-6 h-6" />
                      )}
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* デスクトップ表示の展開部分 */}
              <div
                className={`hidden lg:block mt-4 relative transform transition-all duration-1000 ease-out ${
                  contentVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                  </motion.div>
                )}
              </div>
            </div>

            <div
              className={`hidden md:block md:mt-20 transform transition-all duration-1000 ease-out ${
                imageVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Image
                src="/images/aboutImage.jpeg"
                alt="About Us"
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
