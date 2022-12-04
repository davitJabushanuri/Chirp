import { LeftArrowIcon } from "@/assets/left-arrow-icon";

import styles from "./styles/back-button.module.scss";
export const BackButton = () => {
  return (
    <button className={styles.container}>
      <LeftArrowIcon />
    </button>
  );
};
