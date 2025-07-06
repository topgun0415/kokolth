'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../../../components/atoms/Typography';

const PaymentSection: React.FC = () => {
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

  const paymentMethods = [
    {
      id: 'credit-card',
      title: 'クレジットカード決済',
      subtitle: 'VISA／Mastercard／AMEX／JCB',
      icon: (
        <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-3 xl:gap-4 2xl:gap-5 mb-4">
          <Image
            src="/images/visaCard.png"
            alt="VISA"
            width={50}
            height={30}
            className="rounded object-contain w-12 h-7 lg:w-16 lg:h-10 xl:w-20 xl:h-12 2xl:w-24 2xl:h-14"
          />
          <Image
            src="/images/masterCard.png"
            alt="Mastercard"
            width={50}
            height={30}
            className="rounded object-contain w-12 h-7 lg:w-16 lg:h-10 xl:w-20 xl:h-12 2xl:w-24 2xl:h-14"
          />
          <Image
            src="/images/amexCard.png"
            alt="AMEX"
            width={50}
            height={30}
            className="rounded object-contain w-12 h-7 lg:w-16 lg:h-10 xl:w-20 xl:h-12 2xl:w-24 2xl:h-14"
          />
          <Image
            src="/images/jcbCard.png"
            alt="JCB"
            width={50}
            height={30}
            className="rounded object-contain w-12 h-7 lg:w-16 lg:h-10 xl:w-20 xl:h-12 2xl:w-24 2xl:h-14"
          />
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <Link href="/" className="flex items-baseline text-gray-700 hover:text-gray-900">
          <svg 
            className="mr-1 h-3 w-3" 
            width="12" 
            height="12" 
            viewBox="0 0 16 16" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.381 1.381A.875.875 0 1 1 7.62 2.62L3.112 7.125H15a.875.875 0 1 1 0 1.75H3.112l4.507 4.506A.875.875 0 1 1 6.38 14.62l-6-6a.872.872 0 0 1 0-1.238l6-6Z"></path>
          </svg>
          <span className="text-sm font-medium">戻る</span>
        </Link>
      </div>
      
                    <section
        ref={sectionRef}
        className='py-2 sm:py-2 lg:py-4 xl:py-4 bg-gray-50 min-h-screen flex items-center'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12'>
          {/* Header Section */}
          <div className='text-center mb-8 sm:mb-12 lg:mb-16'>
            <div
              className={`transform transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}>
            </div>
          </div>

          {/* Content Section */}
          <div className='max-w-2xl lg:max-w-4xl xl:max-w-7xl 2xl:max-w-full mx-auto'>

            {/* Payment Methods */}
            <div className='grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-8 sm:mb-12 lg:mb-16'>
              {paymentMethods.map((method, index) => (
                <div
                  key={method.id}
                  className={`transform transition-all duration-1000 ease-out ${
                    contentVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${1000 + index * 200}ms` 
                  }}>
                  <div className='bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-12 xl:p-16 2xl:p-20 h-full border border-gray-200 hover:shadow-md transition-shadow'>
                    <div className='text-center'>
                      {/* Icon */}
                      <div className='mb-4 lg:mb-6 xl:mb-8 2xl:mb-10'>
                        {method.icon}
                      </div>
                      
                      {/* Title */}
                      <Typography
                        variant='body'
                        weight='bold'
                        color='primary'
                        className='text-lg sm:text-xl lg:text-2xl xl:text-4xl 2xl:text-5xl font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed mb-2 lg:mb-3 xl:mb-4 2xl:mb-6'>
                        {method.title}
                      </Typography>
                      
                      {/* Subtitle */}
                      {method.subtitle && (
                        <Typography
                          variant='body'
                          weight='medium'
                          color='primary'
                          className='text-base lg:text-lg xl:text-2xl 2xl:text-3xl font-["M_PLUS_1p",sans-serif] tracking-wide mb-4 lg:mb-6 xl:mb-8 2xl:mb-10 text-[#666]'>
                          （{method.subtitle}）
                        </Typography>
                      )}
                      
                      {/* Stripe Payment Links for Credit Card */}
                      {method.id === 'credit-card' && (
                        <div className='mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 pt-4 lg:pt-6 xl:pt-8 2xl:pt-10 border-t border-gray-200 space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6'>
                          {/* 初回お試しプラン */}
                          <a
                            href="https://buy.stripe.com/test_aFa7sL4JT74I12xeAH4AU02"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='inline-block w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-3 lg:py-4 xl:py-6 2xl:py-8 px-6 lg:px-8 xl:px-10 2xl:px-12 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md'>
                            <Typography
                              variant='body'
                              weight='medium'
                              color='primary'
                              className='text-sm lg:text-base xl:text-xl 2xl:text-2xl font-["M_PLUS_1p",sans-serif] tracking-wide text-white'>
                              初回お試しプラン
                            </Typography>
                            <Typography
                              variant='body'
                              weight='regular'
                              color='primary'
                              className='text-xs lg:text-sm xl:text-lg 2xl:text-xl font-["M_PLUS_1p",sans-serif] tracking-wide mt-1 opacity-90 text-white'>
                              1,000円（税込）
                            </Typography>
                            <Typography
                              variant='body'
                              weight='regular'
                              color='primary'
                              className='text-xs lg:text-sm xl:text-lg 2xl:text-xl font-["M_PLUS_1p",sans-serif] tracking-wide mt-1 opacity-90 text-white'>
                              メール1往復
                            </Typography>
                            <Typography
                              variant='body'
                              weight='regular'
                              color='primary'
                              className='text-xs lg:text-sm xl:text-lg 2xl:text-xl font-["M_PLUS_1p",sans-serif] tracking-wide mt-1 opacity-90 text-white'>
                              ※初回のみ
                            </Typography>
                          </a>
                          
                          {/* 通常プラン */}
                          <a
                            href="https://buy.stripe.com/test_14AcN54JT1KobHb2RZ4AU01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='inline-block w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-medium py-3 lg:py-4 xl:py-6 2xl:py-8 px-6 lg:px-8 xl:px-10 2xl:px-12 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md'>
                            <Typography
                              variant='body'
                              weight='medium'
                              color='primary'
                              className='text-sm lg:text-base xl:text-xl 2xl:text-2xl font-["M_PLUS_1p",sans-serif] tracking-wide text-white'>
                              通常プラン
                            </Typography>
                            <Typography
                              variant='body'
                              weight='regular'
                              color='primary'
                              className='text-xs lg:text-sm xl:text-lg 2xl:text-xl font-["M_PLUS_1p",sans-serif] tracking-wide mt-1 opacity-90 text-white'>
                              2,000円（税込）
                            </Typography>
                            <Typography
                              variant='body'
                              weight='regular'
                              color='primary'
                              className='text-xs lg:text-sm xl:text-lg 2xl:text-xl font-["M_PLUS_1p",sans-serif] tracking-wide mt-1 opacity-90 text-white'>
                              メール1往復
                            </Typography>
                          </a>
                          
                          {/* 継続サポート3回パック */}
                          <a
                            href="https://buy.stripe.com/test_7sY00j6S13SwfXr5074AU00"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='inline-block w-full bg-gradient-to-r from-slate-700 to-slate-700 hover:from-slate-600 hover:to-slate-700 text-white font-medium py-3 lg:py-4 xl:py-6 2xl:py-8 px-6 lg:px-8 xl:px-10 2xl:px-12 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md'>
                            <Typography
                              variant='body'
                              weight='medium'
                              color='primary'
                              className='text-sm lg:text-base xl:text-xl 2xl:text-2xl font-["M_PLUS_1p",sans-serif] tracking-wide text-white'>
                              継続サポート3回パック
                            </Typography>
                            <Typography
                              variant='body'
                              weight='regular'
                              color='primary'
                              className='text-xs lg:text-sm xl:text-lg 2xl:text-xl font-["M_PLUS_1p",sans-serif] tracking-wide mt-1 opacity-90 text-white'>
                              5,000円（税込）
                            </Typography>
                            <Typography
                              variant='body'
                              weight='regular'
                              color='primary'
                              className='text-xs lg:text-sm xl:text-lg 2xl:text-xl font-["M_PLUS_1p",sans-serif] tracking-wide mt-1 opacity-90 text-white'>
                              メール３往復
                            </Typography>
                          </a>
                        </div>
                      )}
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
                transitionDelay: `${1000 + paymentMethods.length * 200 + 300}ms` 
              }}>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentSection;
