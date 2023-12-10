import { create } from "zustand";

interface IHamburger {
  isHamburgerOpen: boolean;
  openHamburger: () => void;
  closeHamburger: () => void;
}

export const useHamburger = create<IHamburger>((set) => ({
  isHamburgerOpen: false,
  openHamburger: () => set({ isHamburgerOpen: true }),
  closeHamburger: () => set({ isHamburgerOpen: false }),
}));
