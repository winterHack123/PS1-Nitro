import { create } from "zustand";

export const useStore = create((set) => ({
  language: 1,
  setLanguage: (value) => set({ language: value }),
}));
