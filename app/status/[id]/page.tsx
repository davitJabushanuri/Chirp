"use client";

import { TweetHeader } from "@/components/layout/header";
import { TweetDetails } from "@/features/tweets";

import styles from "./styles/tweet-page.module.scss";

const Tweet = () => {
  return (
    <div className={styles.container}>
      <TweetHeader />
      <TweetDetails />
    </div>
  );
};

export default Tweet;
