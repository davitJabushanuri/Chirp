import { useState } from "react";

import { ActionsModal } from "@/components/elements/actions-modal";

import { RetweetIcon } from "../../assets/retweet-icon";
import { ITweet } from "../../types";

import { RetweetActions } from "./retweet-actions";
import styles from "./styles/actions.module.scss";

export const RetweetButton = ({
  tweet,
  stats = 0,
}: {
  tweet: ITweet;
  stats?: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <ActionsModal setIsModalOpen={setIsModalOpen}>
          <RetweetActions tweet={tweet} />
        </ActionsModal>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={styles.retweet}
      >
        <span className={`${styles.icon}`}>
          <RetweetIcon />
        </span>
        {stats > 0 && <span className={styles.stats}>{stats}</span>}
      </button>
    </div>
  );
};
