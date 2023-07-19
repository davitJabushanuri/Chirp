"use client";

import { TweetHeader } from "@/features/header";
import { TweetDetails } from "@/features/tweets";

export const TweetClientPage = () => {
  return (
    <div>
      <TweetHeader />
      <TweetDetails />
    </div>
  );
};
