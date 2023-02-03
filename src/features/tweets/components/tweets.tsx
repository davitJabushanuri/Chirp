"use client";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useTweets } from "../hooks/use-tweets";

import styles from "./styles/tweets.module.scss";
import { Tweet } from "./tweet";

export const Tweets = () => {
  const { data: tweets, isLoading, isError, isSuccess } = useTweets();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  console.log(tweets);

  return (
    <div className={styles.container}>
      {isSuccess &&
        tweets?.length > 0 &&
        tweets?.map((tweet) => (
          <div className={styles.tweetContainer} key={tweet.id}>
            <Tweet tweet={tweet} />
          </div>
        ))}
    </div>
  );
};
