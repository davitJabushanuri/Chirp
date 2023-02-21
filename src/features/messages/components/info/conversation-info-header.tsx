import { BackButton } from "@/components/elements/back-button";

import styles from "./styles/conversation-info-header.module.scss";

export const ConversationInfoHeader = () => {
  return (
    <div className={styles.container}>
      <BackButton />
      <h1>Conversation info</h1>
    </div>
  );
};
