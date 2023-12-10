"use client";
import { useSession } from "next-auth/react";

import { SessionOwnerButton } from "@/features/auth";
import { TweetButton } from "@/features/create-tweet";
import { Navbar } from "@/features/navbar";

import { Logo } from "./logo";
import styles from "./styles/sidebar.module.scss";

export const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      {session && (
        <div className={styles.tweetButton}>
          <TweetButton />
        </div>
      )}
      {session && (
        <div className={styles.user}>
          <SessionOwnerButton />
        </div>
      )}
    </header>
  );
};
