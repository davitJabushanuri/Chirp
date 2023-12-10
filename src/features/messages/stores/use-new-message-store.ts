import { create } from "zustand";

interface INewMessageStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useNewMessageStore = create<INewMessageStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
