import { create } from "zustand";

import { ITweet } from "@/features/tweets";

interface IData {
  parent_tweet: ITweet | null;
  quoted_tweet: ITweet | null;
  in_reply_to_screen_name: string | null;
  in_reply_to_status_id: string | null;
  placeholder: string | null;
}

interface IModal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  data: IData;
  setData: (data: IData) => void;
}

export const useCreateTweetModal = create<IModal>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => {
    set({
      isModalOpen: false,
      data: {
        parent_tweet: null,
        quoted_tweet: null,
        in_reply_to_screen_name: null,
        in_reply_to_status_id: null,
        placeholder: `What's happening?`,
      },
    });
  },

  data: {
    parent_tweet: null,
    quoted_tweet: null,
    in_reply_to_screen_name: null,
    in_reply_to_status_id: null,
    placeholder: `What's happening?`,
  },

  setData: (data) => set({ data, isModalOpen: true }),
}));
