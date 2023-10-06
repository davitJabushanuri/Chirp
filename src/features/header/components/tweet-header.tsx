"use client";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseButton } from "@/components/elements/close-button";

import styles from "./styles/tweet-header.module.scss";

export const TweetHeader = ({ heading = "Tweet" }: { heading?: string }) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <CloseButton
        onClick={() => {
          router.back();
        }}
        ariaLabel="Back"
        title="Back"
      >
        <BackArrowIcon />
      </CloseButton>
      <h2 className={styles.title}>{heading}</h2>
    </div>
  );
};
