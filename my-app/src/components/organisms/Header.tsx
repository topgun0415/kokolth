'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '../molecules/Navigation';

export const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-30 transition-all duration-400
          ${
            isScrolled || isNavOpen
              ? 'bg-gray-50 shadow-md py-4'
              : 'py-4'
          }
        `}>
        <div className='px-4 flex justify-start items-center '>
          {/* Mobile */}
          <div className='md:hidden'>
            <Navigation setNavBackground={setIsNavOpen} />
          </div>

          {/* Desktop */}
          <div className='hidden md:flex justify-start w-full'>
            <Navigation setNavBackground={setIsNavOpen} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
