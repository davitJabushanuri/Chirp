import { BackArrowIcon } from "@/assets/back-arrow-icon";

import styles from "./styles/back-button.module.scss";

export const BackButton = () => {
  return (
    <span className={styles.container}>
      <BackArrowIcon />
    </span>
  );
};
