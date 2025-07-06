'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function GlobalStateManager() {
  const setLogin = useAuthStore((state) => state.setLogin);
  const setLogout = useAuthStore((state) => state.setLogout);

  useEffect(() => {
    
    const checkInitialSession = async () => {
      try {
        const response = await fetch('/api/auth/session', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const { user } = await response.json();
          
          if (user) {
            setLogin({
              id: user.id,
              name: user.name,
              email: user.email,
              is_admin: user.is_admin,
            });
            
          } else {
            setLogout();
          }
        } else {
          setLogout();
        }
      } catch {
        setLogout();
      }
    };
    
    checkInitialSession();
  }, [setLogin, setLogout]);

  return null;
}