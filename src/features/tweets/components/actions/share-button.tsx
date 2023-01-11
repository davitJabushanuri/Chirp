import { useState } from "react";

import { ActionsModal } from "@/components/elements/actions-modal";

import { ShareIcon } from "../../assets/share-icon";
import { ITweet } from "../../types";

import { ShareActions } from "./share-actions";
import styles from "./styles/actions.module.scss";

export const ShareButton = ({ tweet }: { tweet: ITweet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <ActionsModal setIsModalOpen={setIsModalOpen}>
          <ShareActions tweet={tweet} />
        </ActionsModal>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={styles.share}
      >
        <span className={`${styles.icon} `}>
          <ShareIcon />
        </span>
      </button>
    </div>
  );
};
