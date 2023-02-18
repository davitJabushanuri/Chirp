"use client";

import { MessagesHeader } from "@/components/layout/header";
import { Conversations } from "@/features/messages";

import styles from "./styles/messages.module.scss";

const MessagesPage = () => {
  return (
    <div className={styles.container}>
      <MessagesHeader />
      <Conversations />
    </div>
  );
};

export default MessagesPage;
