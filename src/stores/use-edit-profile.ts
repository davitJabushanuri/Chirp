import create from "zustand";

interface IEditProfile {
  isEditProfileModalOpen: boolean;
  openEditProfileModal: () => void;
  closeEditProfileModal: () => void;
}

export const useEditProfile = create<IEditProfile>((set) => ({
  isEditProfileModalOpen: false,
  openEditProfileModal: () => set({ isEditProfileModalOpen: true }),
  closeEditProfileModal: () => set({ isEditProfileModalOpen: false }),
}));
