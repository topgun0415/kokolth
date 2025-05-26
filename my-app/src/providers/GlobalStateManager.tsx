'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { supabaseClient } from '@/lib/supabase/supabaseClient';

export default function GlobalStateManager() {
  const setLogin = useAuthStore((state) => state.setLogin);
  const setLogout = useAuthStore((state) => state.setLogout);

  useEffect(() => {
    // Check Supabase Auth session
    const checkSupabaseAuth = async () => {
      const supabase = supabaseClient;
      const { data: { session: supabaseSession } } = await supabase.auth.getSession();
      
      if (supabaseSession) {
        // User is authenticated via Supabase Auth
        const { data: userData } = await supabase
          .from('user')
          .select('id, name, is_admin')
          .eq('email', supabaseSession.user.email)
          .single();

        if (userData) {
          setLogin({
            id: userData.id,
            name: userData.name,
            image: '/icons/defaultProfile.webp',
            is_admin: userData.is_admin,
            status: 'active',
          });
        }
      } else {
        // No session found, set logged out state
        setLogout();
      }
    };
    
    checkSupabaseAuth();
    
    // Listen for auth state changes
    const supabase = supabaseClient;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // User signed in
          const { data: userData } = await supabase
            .from('user')
            .select('id, name, is_admin')
            .eq('email', session.user.email)
            .single();

          if (userData) {
            setLogin({
              id: userData.id,
              name: userData.name,
              image: '/icons/defaultProfile.webp',
              is_admin: userData.is_admin,
              status: 'active',
            });
          }
        } else if (event === 'SIGNED_OUT') {
          // User signed out
          setLogout();
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [setLogin, setLogout]);

  return null;
}