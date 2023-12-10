import { create } from "zustand";

interface IJoinTwitter {
  data: {
    isModalOpen: boolean;
    action: string;
    user?: string;
  };
  setData: (data: {
    isModalOpen: boolean;
    action: string;
    user?: string;
  }) => void;
}

export const useJoinTwitter = create<IJoinTwitter>((set) => ({
  data: {
    isModalOpen: false,
    action: "comment",
    user: "user",
  },

  setData: (data) => set({ data }),
}));
