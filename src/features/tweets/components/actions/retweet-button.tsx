import { useState } from "react";

import { RetweetIcon } from "../../assets/retweet-icon";

import { RetweetModal } from "./retweet-modal";
import styles from "./styles/actions.module.scss";

export const RetweetButton = ({ stats = 0 }: { stats?: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={`${styles.container} ${styles.retweet}`}
      >
        <span className={`${styles.icon}`}>
          <RetweetIcon />
        </span>
        {stats > 0 && <span className={styles.stats}>{stats}</span>}
      </button>
      {isModalOpen && <RetweetModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};
