'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '../atoms/Typography';
import { toast } from 'react-hot-toast';
import { supabaseClient } from '@/lib/supabase/supabaseClient';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
}: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  // Handle email login with Supabase Auth
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.error) {
        if (data.errorType === 'Email not confirmed') {
          setMessage('メール認証がまだ完了していません');
          setMessageType('error');
        } else if (data.errorType === 'Invalid login credentials') {
          // Email check & send email API
          const emailResponse = await fetch('/api/auth/email', { 
            method: 'POST',
            body: JSON.stringify({ email, password }),
          });

          
          const emailData = await emailResponse.json();
          if (emailData.error) {
            setMessage('認証メールを送信しました');
            setMessageType('success');
          } else {
            setMessage('メールアドレスまたはパスワードが間違っています');
            setMessageType('error');
          }

          // Check whether the email is already registered or not 
          const response = await fetch('/api/auth/email', { 
            method: 'POST',
            body: JSON.stringify({ email }),
          });
          const data = await response.json();
          if (data.error) {
            setMessage('メールアドレスがすでに登録されています');
            setMessageType('error');
          }
        } else {
          setMessage('認証メールを送信しました');
          setMessageType('success');
        }
      } else {
        toast.success('ログインに成功しました');
        onClose(); // Close modal on successful login
      }
    } catch {
      toast.error('ログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  }

  // Handle social login with Supabase Auth
  const handleSocialLogin = async (provider: 'google') => {
    setIsLoading(true);
    try {
      const supabase = supabaseClient;
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        }
      });

      if (error) {
        toast.error('ソーシャルログインに失敗しました');
      }
      // OAuth will handle the redirect, so we don't close the modal here
    } catch {
      toast.error('ソーシャルログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-82 max-w-md z-50'>
            <div className='bg-white rounded-lg shadow-xl overflow-hidden'>
              {/* Form */}
              <form onSubmit={handleEmailLogin} className='p-6 space-y-4'>
                <Typography
                  variant='h3'
                  weight='bold'
                  color='black'
                  font='yugothic-bold'
                  className='mb-6'>
                  ログイン
                </Typography>
                <button
                  type='button'
                  onClick={onClose}
                  className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none z-50'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>

                <div className='space-y-2'>
                  <label htmlFor='email' className='block text-sm font-medium '>
                    メールアドレス
                  </label>
                  <div className='flex items-center space-x-2'>
                    <input
                      type='email'
                      id='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='flex-1 px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium '>
                    パスワード
                  </label>
                  <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-500 rounded-md 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
                    required
                  />
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full py-2 px-4 bg-black hover:bg-gray-700 text-white font-semibold 
                           rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                           disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
                  {isLoading ? (
                    <span className='flex items-center justify-center'>
                      <svg
                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'>
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                      </svg>
                      ログイン中...
                    </span>
                  ) : (
                    'ログイン'
                  )}
                </button>
                <p className='text-[10px] text-gray-500'>※初めて利用する方は、メールアドレスと任意のパスワードを入力</p>

                {/* Mail Link Sent Message */}
                {message && (
                  <div className={`p-3 rounded-lg text-sm ${
                    messageType === 'success' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {message}
                  </div>
                )}

                {/* Divider */}
                <div className='relative my-6'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-300'></div>
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='px-2 bg-white text-gray-500'>または</span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className='space-y-3'>
                  {/* LINE Login Button */}
                  <button
                    type='button'
                    disabled={isLoading}
                    className='w-full flex items-center justify-center px-4 py-2 
                             bg-[#00B900] hover:bg-[#00a000] text-white rounded-md 
                             transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'>
                    <svg
                      className='w-6 h-6 mr-2'
                      viewBox='0 0 24 24'
                      fill='currentColor'>
                      <path d='M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.001 12 .001S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314' />
                    </svg>
                    LINEでログイン(準備中)
                  </button>

                  {/* Google Login Button */}
                  <button
                    type='button'
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className='w-full flex items-center justify-center px-4 py-2 
                             bg-white border border-gray-300 rounded-md hover:bg-gray-50 
                             transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'>
                    <svg className='w-6 h-6 mr-2' viewBox='0 0 24 24'>
                      <path
                        fill='#4285F4'
                        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                      />
                      <path
                        fill='#34A853'
                        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                      />
                      <path
                        fill='#FBBC05'
                        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                      />
                      <path
                        fill='#EA4335'
                        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                      />
                    </svg>
                    Googleでログイン
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}