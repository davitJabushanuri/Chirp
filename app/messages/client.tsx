"use client";
import { MessagesHeader } from "@/components/layout/header";
import { Conversations } from "@/features/messages";

import styles from "./styles/messages.module.scss";

export const MessagesClientPage = () => {
  return (
    <div className={styles.container}>
      <MessagesHeader />
      <Conversations />
    </div>
  );
};
