'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '../atoms/Typography';

const ContactSection: React.FC = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
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
    <section ref={sectionRef} className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div
            className={`transform transition-all duration-1000 ease-out ${
              titleVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            <Typography variant='h2' weight='medium' color='primary'>
              CONTACT
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
              className='mb-6'>
              お問い合わせ
            </Typography>
          </div>
        </div>

        {/* Contact Form */}
        <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-8'>
          <form className='space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-1'>
                お名前
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-600 focus:border-transparent'
                placeholder='山田 太郎'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'>
                メールアドレス
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-600 focus:border-transparent'
                placeholder='example@email.com'
              />
            </div>

            <div>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-gray-700 mb-1'>
                メッセージ
              </label>
              <textarea
                id='message'
                name='message'
                rows={6}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-600 focus:border-transparent'
                placeholder='ご相談内容をご記入ください'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors duration-200'>
              送信する
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className='mt-12 text-center'>
          <Typography variant='body' color='primary' className='mb-4'>
            メールでのお問い合わせも承っております
          </Typography>
          <a
            href='mailto:contact@example.com'
            className='text-gray-600 hover:text-gray-800'>
            kokolth@example.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
