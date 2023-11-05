import { create } from "zustand";

export const useFeatureStore = create((set) => ({
  inViewFeature: null,
  setInViewFeature: (feature) => set({ inViewFeature: feature }),
  fullscreenFeature: null,
  setFullscreenFeature: (feature) => {
    set({ fullscreenFeature: feature });
    if (feature !== null) {
      set({ lastFullscreenFeature: feature });
    }
  },
  lastFullscreenFeature: null,
  setLastFullscreenFeature: (feature) =>
    set({ lastFullscreenFeature: feature }),
}));
