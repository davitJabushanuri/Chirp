"use client";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useTweets } from "../hooks/use-tweets";
import { ITweet } from "../types";

import styles from "./styles/tweets.module.scss";
import { Tweet } from "./tweet";

export const Tweets = () => {
  const {
    data: tweets,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTweets();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      {isSuccess &&
        tweets?.pages?.map((page) => {
          return page?.tweets?.map((tweet: ITweet) => (
            <div className={styles.tweetContainer} key={tweet.id}>
              <Tweet tweet={tweet} />
            </div>
          ));
        })}
      <button onClick={() => fetchNextPage()}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};
