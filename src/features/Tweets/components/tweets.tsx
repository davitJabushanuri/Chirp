"use client";

import { useQuery } from "@tanstack/react-query";

import getTweets from "../api/getTweets";
import { ITweet } from "../types";

import styles from "./styles/tweets.module.scss";
import Tweet from "./tweet";

export const Tweets = () => {
  const {
    data: tweets,
    isLoading,
    isError,
  } = useQuery<ITweet[] | null>(["tweets"], () => getTweets());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className={styles.container}>
      {tweets?.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};
