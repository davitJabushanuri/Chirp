"use client";

import { MessagesHeader } from "@/components/layout/header";
import { Messages } from "@/features/messages";

import styles from "./styles/messages.module.scss";

const MessagesPage = () => {
  return (
    <div className={styles.container}>
      <MessagesHeader />
      <Messages />
    </div>
  );
};

export default MessagesPage;
