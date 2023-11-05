import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ user: user })),
  removeUser: () => set({ user: null }),
}));
