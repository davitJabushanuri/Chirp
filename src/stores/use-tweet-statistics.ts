import { create } from "zustand";

import { IUser } from "@/features/profile";

interface ITweetStatistics {
  isTweetStatisticsModalOpen: boolean;
  openTweetStatisticsModal: () => void;
  closeTweetStatisticsModal: () => void;
  authors: IUser[] | null;
  setAuthors: (authors: IUser[]) => void;
  statisticType: string | null;
  setStatisticType: (statisticType: string) => void;
}

export const useTweetStatistics = create<ITweetStatistics>((set) => ({
  isTweetStatisticsModalOpen: false,
  openTweetStatisticsModal: () =>
    set({ isTweetStatisticsModalOpen: true, authors: null }),
  closeTweetStatisticsModal: () => set({ isTweetStatisticsModalOpen: false }),
  authors: null,

  setAuthors: (authors) => set({ authors }),
  statisticType: null,
  setStatisticType: (statisticType: string) => set({ statisticType }),
}));
