"use client";
import { CloseIcon } from "@/assets/close-icon";
import { CloseButton } from "@/components/elements/close-button";

import { useNewMessageStore } from "../../stores/use-new-message-store";

import styles from "./styles/new-message-header.module.scss";

export const NewMessageHeader = () => {
  const closeModal = useNewMessageStore((state) => state.closeModal);

  return (
    <div className={styles.container}>
      <CloseButton onClick={closeModal} ariaLabel="Close" title="Close">
        <CloseIcon />
      </CloseButton>

      <h1>New message</h1>
    </div>
  );
};
