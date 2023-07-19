"use client";

import { TweetHeader } from "@/features/header";
import { TweetQuotes } from "@/features/tweets";

export const TweetQuotesClientPage = () => {
  return (
    <div>
      <TweetHeader />
      <TweetQuotes />
    </div>
  );
};
