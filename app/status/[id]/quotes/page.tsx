"use client";

import { TweetHeader } from "@/components/layout/header";
import { TweetQuotes } from "@/features/tweets";

import styles from "./styles/quotes.module.scss";

const Quotes = () => {
  return (
    <div className={styles.container}>
      <TweetHeader />
      <TweetQuotes />
    </div>
  );
};

export default Quotes;
