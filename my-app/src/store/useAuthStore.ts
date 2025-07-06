import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email?: string;
  is_admin: boolean;
}

type AuthState = {
  user: User;
  isLoggedIn: boolean;
  setLogin: (userInfo: User) => void;
  setLogout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: { id: '', name: '', email: '', is_admin: false },
      isLoggedIn: false,

      // login
      setLogin: (user: User) => 
        set({ user, isLoggedIn: true }),

      // logout
      setLogout: () => set({ 
        user: { id: '', name: '', email: '', is_admin: false }, 
        isLoggedIn: false 
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
