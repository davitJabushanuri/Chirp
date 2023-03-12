"use client";

import { TweetHeader } from "@/components/layout/header";
import { TweetDetails } from "@/features/tweets";

export const TweetClientPage = () => {
  return (
    <div>
      <TweetHeader />
      <TweetDetails />
    </div>
  );
};
