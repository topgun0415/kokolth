import React, { useState } from 'react';
import Link from 'next/link';
import NavCircleBtn from '../atoms/NavigationCircleButton';

interface NavigationProps {
  className?: string;
  setNavBackground?: (isOpen: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  className = '',
  setNavBackground,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'コンセプト', href: '/' },
    { label: 'こんなお悩みの方へ', href: '/about' },
    { label: 'メールカウンセリング', href: '/menu' },
    { label: '料金', href: '/contact' },
    { label: 'お問い合わせ', href: '/qna' },
  ];

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (setNavBackground) setNavBackground(newState);
  };

  return (
    <nav className={`${className}`}>
      {/* Desktop Navigation */}
      <div className='hidden md:flex space-x-3 items-center'>
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} className='cursor-pointer'>
            <span className='text-md font-bold ms-4 text-gray-800 hover:text-gray-300 transition-colors'>
              {item.label}
            </span>
          </Link>
        ))}
        <NavCircleBtn
          icon='/icons/ios_call_icon.png'
          link='#'
          width={25}
          height={25}
          altText='電話でお問い合わせ'
        />
        <NavCircleBtn
          icon='/icons/line_bk_icon.png'
          link='#'
          width={40}
          height={40}
          altText='LINEでお問い合わせ'
        />
        <NavCircleBtn
          icon='/icons/insta_bk_icon.png'
          link='#'
          width={25}
          height={25}
          altText='インスタグラムでお問い合わせ'
        />
      </div>

      {/* Mobile Navigation */}
      <div className='md:hidden'>
        <button
          className='text-black hover:text-white focus:outline-none'
          onClick={toggleMobileMenu}
          aria-label='Toggle menu'>
          {isMobileMenuOpen ? (
            <svg
              className='w-6 h-6 text-left transition-all duration-300'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              className='w-6 h-6 transition-all duration-300'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </button>

        <div
          className={`absolute top-13 left-0 right-0 p-4 z-10 transition-all duration-400 ${
            isMobileMenuOpen
              ? 'bg-white shadow-lg'
              : 'bg-transparent shadow-none'
          }`}>
          {isMobileMenuOpen && (
            <div className='flex flex-col space-y-4'>
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className='cursor-pointer'>
                  <span
                    className='text-lg font-medium transition-colors'
                    onClick={() => setIsMobileMenuOpen(false)}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
