import { CloseIcon } from "@/assets/close-icon";

import styles from "./styles/new-message-header.module.scss";

export const NewMessageHeader = () => {
  return (
    <div className={styles.container}>
      <button className={styles.close}>
        <CloseIcon />
      </button>

      <h1>New message</h1>
    </div>
  );
};
