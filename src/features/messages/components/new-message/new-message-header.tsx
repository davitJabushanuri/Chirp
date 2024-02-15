"use client";
import { CloseIcon } from "@/assets/close-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";

import { useNewMessageStore } from "../../stores/use-new-message-store";

import styles from "./styles/new-message-header.module.scss";

export const NewMessageHeader = () => {
  const closeModal = useNewMessageStore((state) => state.closeModal);

  return (
    <div className={styles.container}>
      <Tooltip text="Back">
        <Button
          aria-label="Back"
          onClick={() => {
            closeModal();
          }}
          className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
        >
          <CloseIcon />
        </Button>
      </Tooltip>

      <h1>New message</h1>
    </div>
  );
};
