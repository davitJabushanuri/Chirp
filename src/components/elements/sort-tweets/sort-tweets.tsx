import { useState } from "react";

import { StarIcon } from "@/assets/star-icon";

import { ActionsModal } from "../actions-modal";

import styles from "./styles/sort-tweets.module.scss";

export const SortTweets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <ActionsModal setIsModalOpen={setIsModalOpen}>
          <SortActions />
        </ActionsModal>
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.sortButton}
      >
        <StarIcon />
      </button>
    </div>
  );
};

const SortActions = () => {
  return (
    <div className={styles.sortActions}>
      <button className={styles.actionButton}>
        <span className={styles.icon}></span>
        <span className={styles.text}>Retweet</span>
      </button>

      <button className={styles.actionButton}>
        <span className={styles.icon}></span>
        <span className={styles.text}>Quote Tweet</span>
      </button>
    </div>
  );
};
