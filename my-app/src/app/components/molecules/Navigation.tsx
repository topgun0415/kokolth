import React, { useState, useEffect, useMemo } from 'react';
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
  const [activeSection, setActiveSection] = useState('');

  const navItems = useMemo(
    () => [
      { label: 'コンセプト', href: '#concept' },
      { label: 'メールカウンセリングとは', href: '#service' },
      { label: 'カウンセラーよりご挨拶', href: '#counseling' },
      { label: '料金', href: '#pricing' },
      { label: 'お問い合わせ', href: '#contact' },
    ],
    []
  );

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (setNavBackground) setNavBackground(newState);
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        if (setNavBackground) setNavBackground(false);
      }

      const headerHeight = document.querySelector('header')?.offsetHeight || 0;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setActiveSection(targetId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;

      const sections = navItems
        .map((item) => {
          const element = document.getElementById(item.href.replace('#', ''));
          return {
            id: item.href.replace('#', ''),
            offsetTop: element?.offsetTop || 0,
            offsetHeight: element?.offsetHeight || 0,
          };
        })
        .filter((section) => section.offsetTop > 0);

      sections.sort((a, b) => a.offsetTop - b.offsetTop);

      let currentActive = '';

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop - headerHeight - 10) {
          currentActive = section.id;
        } else {
          break;
        }
      }

      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    let timeout: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', debouncedScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(timeout);
    };
  }, [activeSection, navItems]);

  return (
    <>
      <nav className={`${className}`}>
        <div className='hidden md:flex space-x-3 items-center'>
          {navItems.map((item) => (
            <a
              href={item.href}
              key={item.href}
              className='cursor-pointer'
              onClick={(e) => scrollToSection(e, item.href)}>
              <span
                className={`text-md font-bold ms-2 me-2 transition-colors ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-blue-500'
                    : 'text-gray-800 hover:text-gray-300'
                }`}>
                {item.label}
              </span>
            </a>
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
            className={`absolute top-14 left-0 right-0 p-4 z-20 transition-all duration-300 ${
              isMobileMenuOpen
                ? 'bg-white shadow-lg'
                : 'bg-transparent shadow-none pointer-events-none'
            }`}>
            {isMobileMenuOpen && (
              <div className='flex flex-col space-y-4'>
                {navItems.map((item) => (
                  <a
                    href={item.href}
                    key={item.href}
                    className='cursor-pointer'
                    onClick={(e) => scrollToSection(e, item.href)}>
                    <span
                      className={`text-lg font-medium transition-colors ${
                        activeSection === item.href.replace('#', '')
                          ? 'text-blue-500'
                          : 'text-gray-800'
                      }`}>
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
