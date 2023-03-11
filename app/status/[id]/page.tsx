/* eslint-disable no-restricted-imports */
"use client";

import { TweetHeader } from "@/components/layout/header";
import { TweetDetails } from "@/features/tweets";

const Tweet = () => {
  return (
    <div>
      <TweetHeader />
      <TweetDetails />
    </div>
  );
};

export default Tweet;
