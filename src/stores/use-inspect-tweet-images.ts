import create from "zustand";

import { ITweet } from "@/features/tweets";

interface IInspectTweetImage {
  isTweetImageModalOpen: boolean;
  openTweetImageModal: () => void;
  closeTweetImageModal: () => void;
  imageIndex: number;
  setImageIndex: (index: number) => void;
  isTweetDetailsOpen: boolean;
  showTweetDetails: () => void;
  hideTweetDetails: () => void;
  tweet: ITweet | undefined;
  setTweet: (tweet: ITweet) => void;
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
  tweet: undefined,
  setTweet: (tweet: ITweet) => set({ tweet: tweet }),
}));
