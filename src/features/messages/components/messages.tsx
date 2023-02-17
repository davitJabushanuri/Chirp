import { StartNewConversation } from "./start-new-conversation";
import styles from "./styles/messages.module.scss";

export const Messages = () => {
  return (
    <div className={styles.container}>
      <StartNewConversation />
    </div>
  );
};
