import { create } from 'zustand';

type AuthState = {
  isLoggedIn: boolean;
  userName: string;
  userImage: string;
  setLogin: (userName: string, userImage: string) => void;
  setLogout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userName: '',
  userImage: '',
  setLogin: (userName, userImage) =>
    set({ isLoggedIn: true, userName, userImage }),
  setLogout: () => set({ isLoggedIn: false, userName: '', userImage: '' }),
}));
