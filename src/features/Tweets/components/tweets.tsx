"use client";
import { useQuery } from "@tanstack/react-query";

import { LoadingSpinner } from "@/components/elements/loading-spinner";

import getTweets from "../api/get-tweets";
import { ITweet } from "../types";

import styles from "./styles/tweets.module.scss";
import { Tweet } from "./tweet";

export const Tweets = () => {
  const {
    data: tweets,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ITweet[] | null>(["tweets"], () => getTweets());

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  console.log(tweets);

  return (
    <div className={styles.container}>
      {isSuccess &&
        tweets?.length &&
        tweets?.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
    </div>
  );
};
