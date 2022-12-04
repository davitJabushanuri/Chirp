"use client";

import { CreateTweet } from "@/features/create-tweet";
import { Tweets } from "@/features/tweets";

import styles from "./styles/home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.createTweet}>
        <CreateTweet />
      </div>
      <div className={styles.feed}>
        <Tweets />
      </div>
    </div>
  );
};

export default Home;
