import { create } from "zustand";

interface IAuthFlow {
  isLogInModalOpen: boolean;
  openLogInModal: () => void;
  closeLogInModal: () => void;
  isLogOutModalOpen: boolean;
  openLogOutModal: () => void;
  closeLogOutModal: () => void;
}

export const useAuthFlow = create<IAuthFlow>((set) => ({
  isLogInModalOpen: false,
  openLogInModal: () => set({ isLogInModalOpen: true }),
  closeLogInModal: () => set({ isLogInModalOpen: false }),

  isLogOutModalOpen: false,
  openLogOutModal: () => set({ isLogOutModalOpen: true }),
  closeLogOutModal: () => set({ isLogOutModalOpen: false }),
}));
