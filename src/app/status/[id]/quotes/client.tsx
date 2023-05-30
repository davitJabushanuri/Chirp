"use client";

import { TweetHeader } from "@/components/layout/header";
import { TweetQuotes } from "@/features/tweets";

export const TweetQuotesClientPage = () => {
  return (
    <div>
      <TweetHeader />
      <TweetQuotes />
    </div>
  );
};
