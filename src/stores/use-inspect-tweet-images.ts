import { create } from "zustand";

interface IInspectTweetImage {
  isTweetImageModalOpen: boolean;
  openTweetImageModal: () => void;
  closeTweetImageModal: () => void;
  imageIndex: number;
  setImageIndex: (index: number) => void;
  isTweetDetailsOpen: boolean;
  showTweetDetails: () => void;
  hideTweetDetails: () => void;
  tweetId: string;
  setTweetId: (tweetId: string) => void;
}

export const useInspectTweetImage = create<IInspectTweetImage>((set) => ({
  isTweetImageModalOpen: false,
  openTweetImageModal: () => set({ isTweetImageModalOpen: true }),
  closeTweetImageModal: () => set({ isTweetImageModalOpen: false }),
  imageIndex: 0,
  setImageIndex: (index: number) => set({ imageIndex: index }),
  isTweetDetailsOpen: true,
  showTweetDetails: () => set({ isTweetDetailsOpen: true }),
  hideTweetDetails: () => set({ isTweetDetailsOpen: false }),
  tweetId: "",
  setTweetId: (tweetId: string) => set({ tweetId: tweetId }),
}));
