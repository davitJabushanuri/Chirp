import { create } from "zustand";

interface IModal {
  isUserModalOpen: boolean;
  isSignOutModalOpen: boolean;
  openUserModal: () => void;
  closeUserModal: () => void;
  openSignOutModal: () => void;
  closeSignOutModal: () => void;
}

export const useAuthModal = create<IModal>((set) => ({
  isUserModalOpen: false,
  isSignOutModalOpen: false,
  openUserModal: () => set({ isUserModalOpen: true }),
  closeUserModal: () => set({ isUserModalOpen: false }),
  openSignOutModal: () => set({ isSignOutModalOpen: true }),
  closeSignOutModal: () => set({ isSignOutModalOpen: false }),
}));
