import { CloseIcon } from "@/assets/close-icon";

import { useNewMessageStore } from "../../stores/use-new-message-store";

import styles from "./styles/new-message-header.module.scss";

export const NewMessageHeader = () => {
  const closeModal = useNewMessageStore((state) => state.closeModal);

  return (
    <div className={styles.container}>
      <button onClick={closeModal} className={styles.close}>
        <CloseIcon />
      </button>

      <h1>New message</h1>
    </div>
  );
};
