'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../atoms/Typography';

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
      id: 'paypay',
      title: 'PayPayでの送金',
      subtitle: '',
      description: 'ご希望の方は、LINE公式アカウントを友だち追加後、PayPay送金のQRコードをご案内いたします',
      icon: (
        <div className="flex items-center justify-center">
          <Image
            src="/images/paypay.png"
            alt="PayPay"
            width={100}
            height={20}
            className="rounded object-contain"
          />
        </div>
      )
    },
    {
      id: 'credit-card',
      title: 'クレジットカード決済はこちら',
      icon: (
        <div className="flex items-center justify-center flex-wrap gap-2 lg:mt-7">
          <Image
            src="/images/visaCard.png"
            alt="VISA"
            width={50}
            height={30}
            className="rounded object-contain"
          />
          <Image
            src="/images/masterCard.png"
            alt="Mastercard"
            width={50}
            height={30}
            className="rounded object-contain"
          />
          <Image
            src="/images/amexCard.png"
            alt="AMEX"
            width={50}
            height={30}
            className="rounded object-contain"
          />
          <Image
            src="/images/jcbCard.png"
            alt="JCB"
            width={50}
            height={30}
            className="rounded object-contain"
          />
        </div>
      )
    }
  ];

  return (
    <section
      ref={sectionRef}
      className='py-12 sm:py-16 md:py-20 bg-transparent'>
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
              支払い方法
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
              お支払い方法は以下の2種類から
              <br />
              お選びいただけます
            </Typography>
          </div>

          {/* Payment Methods */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12'>
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
                <div className='bg-white rounded-lg shadow-sm p-6 sm:p-8 h-full border border-gray-200 hover:shadow-md transition-shadow'>
                  <div className='text-center'>
                    {/* Icon */}
                    <div className='mb-4'>
                      {method.icon}
                    </div>
                    
                    {/* Title */}
                    {method.id === 'credit-card' ? (
                      <Link href="/payments" className="hover:text-blue-700 transition-colors">
                        <Typography
                          variant='body'
                          weight='bold'
                          color='primary'
                          className='text-lg sm:text-xl font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed mb-2 text-blue-600 hover:text-blue-700 transition-colors cursor-pointer underline lg:mt-12'>
                          {method.title}
                        </Typography>
                      </Link>
                    ) : (
                      <Typography
                        variant='body'
                        weight='bold'
                        color='primary'
                        className='text-lg sm:text-xl font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed mb-2'>
                        {method.title}
                      </Typography>
                    )}
                    
                    {/* Subtitle */}
                    {method.subtitle && (
                      <Typography
                        variant='body'
                        weight='medium'
                        color='primary'
                        className='text-base font-["M_PLUS_1p",sans-serif] tracking-wide mb-4 text-[#666]'>
                        （{method.subtitle}）
                      </Typography>
                    )}
                    
                    {/* Description */}
                    {method.description && (
                      <Typography
                        variant='body'
                        weight='regular'
                        color='primary'
                        className='text-sm font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed'>
                          {method.description}
                      </Typography>
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
            <div className='text-center'>
              <Typography
                variant='body'
                weight='regular'
                color='primary'
                className='text-sm font-["M_PLUS_1p",sans-serif] tracking-wide leading-relaxed'>
                お支払い方法についてご不明な点が
                <br />
                ございましたら、どうぞお気軽にLINEより
                <br />
                お問い合わせくださいませ
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
