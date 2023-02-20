"use client";

import { Messages } from "@/features/messages";

import styles from "./styles/conversations-page.module.scss";

const ConversationPage = () => {
  return (
    <div className={styles.container}>
      <Messages />
    </div>
  );
};

export default ConversationPage;
