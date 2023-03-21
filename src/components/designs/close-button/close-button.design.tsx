import { CloseIcon } from "@/assets/close-icon";

import styles from "./styles/close-button.module.scss";

export const CloseButton = () => {
  return (
    <span className={styles.container}>
      <CloseIcon />
    </span>
  );
};
