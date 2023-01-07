import zustand from "zustand";

import { ITweet } from "@/features/tweets";

interface IUseCreateTweet {
  quoted_tweet: ITweet | null;
  setQuotedTweet: (tweet: ITweet | null) => void;
  in_reply_to_screen_name: string | null;
  setScreenName: (screen_name: string | null) => void;
  in_reply_to_status_id: string | null;
  setStatusId: (status_id: string | null) => void;
  placeholder: string | null;
  setPlaceholder: (placeholder: string | null) => void;
}

export const useCreateTweet = zustand<IUseCreateTweet>((set) => ({
  quoted_tweet: null,
  setQuotedTweet: (tweet) => set({ quoted_tweet: tweet }),
  in_reply_to_screen_name: null,
  setScreenName: (screen_name) => set({ in_reply_to_screen_name: screen_name }),
  in_reply_to_status_id: null,
  setStatusId: (status_id) => set({ in_reply_to_status_id: status_id }),
  placeholder: `What's happening?`,
  setPlaceholder: (placeholder) => set({ placeholder: placeholder }),
}));
