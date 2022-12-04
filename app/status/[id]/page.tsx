"use client";

import { TweetDetails } from "@/features/tweets";

import styles from "./styles/tweet-page.module.scss";

const Tweet = () => {
  return (
    <div className={styles.container}>
      <TweetDetails />
    </div>
  );
};

export default Tweet;
