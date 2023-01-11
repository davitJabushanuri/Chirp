/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { ITweet, OptionsAction } from "@/features/tweets";

import { ActionsModal } from "../actions-modal";

import styles from "./styles/options.module.scss";

export const Options = ({ tweet }: { tweet: ITweet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={styles.container}
    >
      {isModalOpen && (
        <ActionsModal setIsModalOpen={setIsModalOpen}>
          <OptionsAction tweet={tweet} />
        </ActionsModal>
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.optionsButton}
      >
        <DotIcon />
      </button>
    </div>
  );
};
