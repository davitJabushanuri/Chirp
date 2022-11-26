import create from "zustand";

interface IModal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = create<IModal>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
