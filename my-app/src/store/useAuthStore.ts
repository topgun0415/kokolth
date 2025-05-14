import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  image: string;
  email?: string;
  status: 'active' | 'inactive';
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
      user: { id: '', name: '', image: '', status: 'active', is_admin: false },
      isLoggedIn: false,
      setLogin: (user: User) => 
        set({ user, isLoggedIn: true }),
      setLogout: () => 
        set({ user: { id:'', name: '', image: '', status: 'inactive', is_admin: false }, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
