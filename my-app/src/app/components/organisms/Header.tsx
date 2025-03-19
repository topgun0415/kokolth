'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '../molecules/Navigation';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-4'}
      `}>
      <div className='container mx-auto px-4 flex justify-between items-center'>
        {/* Mobile */}
        <div className='md:hidden flex items-center'>
          <Navigation />
        </div>

        {/* Desktop */}
        <div className='hidden md:flex justify-end w-full'>
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
