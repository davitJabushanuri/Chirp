"use client";
import { CreateTweet } from "@/features/create-tweet";
import { Header, HomeHeader } from "@/features/header";
import { Tweets } from "@/features/tweets";

import styles from "./styles/home.module.scss";

export const HomeClientPage = () => {
  return (
    <div className={styles.container}>
      <Header>
        <HomeHeader />
      </Header>

      <div className={styles.createTweet}>
        <CreateTweet />
      </div>
      <div className={styles.feed}>
        <Tweets />
      </div>
    </div>
  );
};
