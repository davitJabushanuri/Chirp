"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { ITweet } from "..";

import styles from "./styles/tweet-quotes.module.scss";
import { Tweet } from "./tweet";

export const TweetQuotes = () => {
  const pathname = usePathname();
  const tweetId = pathname?.split(`/`)[2] || ``;

  const {
    data: tweets,
    isLoading,
    isError,
  } = useQuery<ITweet[]>({
    queryKey: ["tweets", tweetId, "quotes"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/tweets/quotes?tweet_id=${tweetId}`,
      );
      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      {tweets?.map((quote) => {
        return (
          <div key={quote?.id} className={styles.quote}>
            <Tweet tweet={quote} />
          </div>
        );
      })}
    </div>
  );
};
