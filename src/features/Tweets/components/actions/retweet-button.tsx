import { RetweetIcon } from "../../assets/retweet-icon";

import styles from "./styles/actions.module.scss";

export const RetweetButton = ({ stats = 0 }: { stats?: number }) => {
  return (
    <button
      onClick={(e) => e.stopPropagation()}
      className={`${styles.container} ${styles.retweet}`}
    >
      <span className={`${styles.icon}`}>
        <RetweetIcon />
      </span>
      {stats > 0 && <span className={styles.stats}>{stats}</span>}
    </button>
  );
};
