"use client";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseButton } from "@/components/elements/close-button";

import styles from "./styles/conversation-info-header.module.scss";

export const ConversationInfoHeader = () => {
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
      <h1>Conversation info</h1>
    </div>
  );
};
