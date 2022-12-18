import { CommentIcon } from "../../assets/comment-icon";

import styles from "./styles/actions.module.scss";

export const CommentButton = ({ stats = 0 }: { stats?: number }) => {
  return (
    <button
      onClick={(e) => e.stopPropagation()}
      className={`${styles.container} ${styles.comment}`}
    >
      <span className={`${styles.icon}`}>
        <CommentIcon />
      </span>
      {stats > 0 && <span className={styles.stats}>{stats}</span>}
    </button>
  );
};
