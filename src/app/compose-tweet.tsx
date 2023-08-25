"use client";

import { CreateTweetModal } from "@/features/create-tweet";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

export const ComposeTweet = () => {
  const isModalOpen = useCreateTweetModal((state) => state.isModalOpen);

  return <>{isModalOpen && <CreateTweetModal />}</>;
};
