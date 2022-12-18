import { HeartIcon } from "../../assets/heart-icon";

import styles from "./styles/actions.module.scss";

export const LikeButton = ({
  stats = 0,
  smallIcons = true,
}: {
  stats?: number;
  smallIcons?: boolean;
}) => {
  return (
    <button
      onClick={(e) => e.stopPropagation()}
      className={`${styles.container} ${styles.like}`}
    >
      <span
        className={`${styles.icon} ${
          smallIcons ? styles.smallIcon : styles.bigIcons
        }`}
      >
        <HeartIcon />
      </span>
      {stats > 0 && <span className={styles.stats}>{stats}</span>}
    </button>
  );
};
