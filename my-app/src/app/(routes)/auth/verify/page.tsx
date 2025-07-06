'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase/supabaseClient';
import LoadingBar from '@/components/atoms/LoadingBar';
import { toast } from 'react-hot-toast';

export default function AuthVerify() {
  const router = useRouter();
  const [message, setMessage] = useState('会員登録中...');
  
  useEffect(() => {
    const handleAuthVerify = async () => {
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
            const response = await fetch('/api/auth/verify', {
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
              
              // Redirect to login page (관리자 승인 대기)
              setTimeout(() => {
                router.push('/admin/login');
              }, 1500);
            }
          }
      } catch {
        toast.error('予期しないエラーが発生しました。');
        router.push('/');
      }
    };
    
    handleAuthVerify();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <LoadingBar message={message} subMessage="しばらくお待ちください..." />
      </div>
    </div>
  );
} 