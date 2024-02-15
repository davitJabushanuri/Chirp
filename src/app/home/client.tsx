"use client";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { SortTweets } from "@/components/elements/sort-tweets";
import { CreateTweet } from "@/features/create-tweet";
import { Header } from "@/features/header";
import { Tweets } from "@/features/tweets";

import styles from "./styles/home.module.scss";

export const HomeClientPage = () => {
  return (
    <div className={styles.container}>
      <Header>
        <HamburgerButton />
        <h2>Home</h2>
        <div className="ml-auto">
          <SortTweets />
        </div>
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
