"use client";
import { Header, MessagesHeader } from "@/features/header";
import { Conversations } from "@/features/messages";

import styles from "./styles/messages.module.scss";

export const MessagesClientPage = () => {
  return (
    <div className={styles.container}>
      <Header>
        <MessagesHeader />
      </Header>
      <Conversations />
    </div>
  );
};
