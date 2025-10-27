import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

export const useAuthStore = create<AuthState>(set => ({
  isLogin: false,
  user: null,
  isLoading: true,
  setIsLogin: (value: boolean) => {
    set({ isLogin: value });
  },
  setUser: (user: User | null) => {
    set({ user });
  },
  setIsLoading: (value: boolean) => {
    set({ isLoading: value });
  },
}));
