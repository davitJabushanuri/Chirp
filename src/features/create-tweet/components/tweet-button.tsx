"use client";
import { useSession } from "next-auth/react";

import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { PenIcon } from "../assets/pen-icon";

import styles from "./styles/tweet-button.module.scss";

export const TweetButton = () => {
  const { data: session } = useSession();
  const openModal = useCreateTweetModal((state) => state.openModal);

  if (!session) return null;

  return (
    <button
      aria-label="Tweet"
      data-title="Tweet"
      onClick={() => {
        openModal();
      }}
      className={styles.container}
    >
      <span className={styles.icon}>
        <PenIcon />
      </span>
      <span className={styles.text}>Tweet</span>
    </button>
  );
};
