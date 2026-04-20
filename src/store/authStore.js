import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../utils/storage';

export const useAuthStore = create(
  persist(
    (set) => ({
      uid: null,
      phone: null,
      role: 'user',
      isLoggedIn: false,
      numCats: 1,
      preferredScent: null,

      setUser: (uid, phone, role) =>
        set({ uid, phone, role, isLoggedIn: true }),

      setOnboarding: (numCats, scent) =>
        set({ numCats, preferredScent: scent }),

      logout: () =>
        set({ uid: null, phone: null, isLoggedIn: false, role: 'user' }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
