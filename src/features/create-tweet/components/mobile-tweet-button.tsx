"use client";
import { useSession } from "next-auth/react";

import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { PenIcon } from "../assets/pen-icon";

import styles from "./styles/mobile-tweet-button.module.scss";

export const MobileTweetButton = () => {
  const { data: session } = useSession();
  const openModal = useCreateTweetModal((state) => state.openModal);

  if (!session) return null;

  return (
    <button
      aria-label="Compose a Tweet"
      data-title="Tweet"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        openModal();
      }}
      className={styles.container}
    >
      <PenIcon />
    </button>
  );
};
