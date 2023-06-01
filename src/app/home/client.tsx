"use client";
import { HomeHeader } from "@/components/layout/header";
import { CreateTweet } from "@/features/create-tweet";
import { Tweets } from "@/features/tweets";

import styles from "./styles/home.module.scss";

export const HomeClientPage = () => {
  return (
    <div className={styles.container}>
      <HomeHeader />
      <div className={styles.createTweet}>
        <CreateTweet />
      </div>
      <div className={styles.feed}>
        <Tweets />
      </div>
    </div>
  );
};
