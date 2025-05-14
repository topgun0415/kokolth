'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/useAuthStore';
import { Navigation } from '../molecules/Navigation';
import ProfileCircle from '../atoms/ProfileCircle';
import LoginModal from '../molecules/LoginModal';
import { supabaseClient } from '@/lib/supabaseClient';

export const Header = () => {
  const { data: session, status } = useSession();
  const setLogin = useAuthStore((state) => state.setLogin);
  const setLogout = useAuthStore((state) => state.setLogout);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {

    // User logged in
    if (status === 'authenticated') {
      // create supabase client
      const supabase = supabaseClient;

      // When the user is authenticated, select the user's info from the supabase
      const fetchUserFromSupabase = async () => {

        let query = supabase.from('user').select('id, name, is_admin');

        if (session?.user?.email) {
          query = query.eq('email', session.user.email);
        } else if (session?.user?.id) {
          query = query.eq('provider_id', session.user.id);
        }
        
        const { data: userData } = await query.single();

        if (userData) {
          setLogin({
            id: userData.id,
            name: userData.name,
            image: session?.user?.image || '/icons/defaultProfile.webp',
            is_admin: userData.is_admin,
            status: 'active',
          });
        } 
      }
      fetchUserFromSupabase();
    // User logged out
    } else if (status === 'unauthenticated') {
      setLogout();
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [status, session, setLogin, setLogout]);

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginSubmit = async (email: string, password: string) => {
    try {
      console.log('Logging in with:', email, password);
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-400
          ${
            isScrolled || isNavOpen
              ? 'bg-gray-50 shadow-md py-4'
              : 'bg-transparent py-4'
          }
        `}>
        <div className='container mx-auto px-4 flex justify-between items-center'>
          {/* Mobile */}
          <div className='md:hidden'>
            <Navigation setNavBackground={setIsNavOpen} />
          </div>

          {/* Mobile */}
          <div className='md:hidden'>
            <ProfileCircle onPress={handleLoginModalOpen} />
          </div>

          {/* Desktop */}
          <div className='hidden md:flex justify-end w-full'>
            <Navigation />
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSubmit={handleLoginSubmit}
      />
    </>
  );
};

export default Header;
