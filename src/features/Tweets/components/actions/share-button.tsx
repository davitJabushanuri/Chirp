import { ShareIcon } from "../../assets/share-icon";

import styles from "./styles/actions.module.scss";

export const ShareButton = () => {
  return (
    <button
      onClick={(e) => e.stopPropagation()}
      className={`${styles.container} ${styles.share}`}
    >
      <span className={`${styles.icon} `}>
        <ShareIcon />
      </span>
    </button>
  );
};
