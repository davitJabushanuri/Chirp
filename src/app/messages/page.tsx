"use client";

import { MessagesHeader } from "@/components/layout/header";

import styles from "./styles/messages.module.scss";

const Messages = () => {
  return (
    <div className={styles.container}>
      <MessagesHeader />
    </div>
  );
};

export default Messages;
