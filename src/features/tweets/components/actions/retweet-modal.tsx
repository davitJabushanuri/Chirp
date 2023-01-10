/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { QuoteTweetIcon } from "../../assets/quote-tweet-icon";
import { RetweetIcon } from "../../assets/retweet-icon";

import styles from "./styles/retweet-modal.module.scss";

export const RetweetModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) => {
  return (
    <div className={styles.container}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modal}
      >
        <button className={styles.retweet}>
          <span className={styles.icon}>
            <RetweetIcon />
          </span>
          <span className={styles.text}>Retweet</span>
        </button>

        <button className={styles.quote}>
          <span className={styles.icon}>
            <QuoteTweetIcon />
          </span>
          <span className={styles.text}>Quote Tweet</span>
        </button>

        <button onClick={() => setIsModalOpen(false)} className={styles.cancel}>
          Cancel
        </button>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(false);
        }}
        className={styles.background}
      ></div>
    </div>
  );
};
