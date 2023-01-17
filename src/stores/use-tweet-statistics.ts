import create from "zustand";

interface ITweetStatistics {
  isTweetStatisticsModalOpen: boolean;
  openTweetStatisticsModal: () => void;
  closeTweetStatisticsModal: () => void;
  statistics: any;
  setStatistics: (statistics: any) => void;
  statisticType: string | null;
  setStatisticType: (statisticType: string) => void;
}

export const useTweetStatistics = create<ITweetStatistics>((set) => ({
  isTweetStatisticsModalOpen: false,
  openTweetStatisticsModal: () =>
    set({ isTweetStatisticsModalOpen: true, statistics: null }),
  closeTweetStatisticsModal: () => set({ isTweetStatisticsModalOpen: false }),
  statistics: null,
  setStatistics: (statistics: any) => set({ statistics }),
  statisticType: null,
  setStatisticType: (statisticType: string) => set({ statisticType }),
}));
