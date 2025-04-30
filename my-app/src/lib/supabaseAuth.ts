import { supabase } from './supabaseClient';

export interface AuthError {
  message: string;
}

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(`サインアウトエラーが発生しました`);
  }
};

/**
 * Get the current user session
 */
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    throw new Error(`セッション取得エラーが発生しました`);
  }
  
  return data.session;
}; 