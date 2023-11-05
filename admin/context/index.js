import { create } from "zustand";

const useContextStore = create((set) => ({
  user: null,
  setUser: () => set((state) => ({ user: state })),
  removeUser: () => set({ user: null }),
}));
