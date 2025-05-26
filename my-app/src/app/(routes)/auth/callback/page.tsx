'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase/supabaseClient';

import { toast } from 'react-hot-toast';

export default function AuthCallback() {
  const router = useRouter();
  const [message, setMessage] = useState('会員登録中...');
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const supabase = supabaseClient;
        
          // Exchange code for session
          const { data, error } = await supabase.auth.getSession();
          // If there is an error, show a toast error message
          if (error) {
            toast.error('認証に失敗しました。');
            return;
          }
          // Check if there is a session and user
          if (data.session && data.session.user) {
            const user = data.session.user;
            setMessage('ユーザー情報を保存中...');

            // Call API to save/update user information
            const response = await fetch('/api/auth/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                authUserId: user.id,
                provider: 'mail'
              }),
            });

            if (!response.ok) {
              toast.error('ユーザー情報の保存に失敗しました。');
            } else {
              toast.success('会員登録が完了しました！');
              
              // Redirect to main page
              setTimeout(() => {
                router.push('/');
              }, 1500);
            }
          }
      } catch {
        toast.error('予期しないエラーが発生しました。');
        router.push('/');
      }
    };
    
    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
        <p className="text-center text-gray-600 mb-4">{message}</p>
        <p className="text-sm text-gray-500">
          しばらくお待ちください...
        </p>
      </div>
    </div>
  );
} 