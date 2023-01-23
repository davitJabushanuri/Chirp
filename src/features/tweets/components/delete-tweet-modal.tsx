/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDisableBodyScroll } from "@/hooks";

import styles from "./styles/delete-tweet-modal.module.scss";

export const DeleteTweetModal = ({
  setIsDeleteModalOpen,
  setIsActionsModalOpen,
}: {
  setIsDeleteModalOpen: (value: boolean) => void;
  setIsActionsModalOpen: (value: boolean) => void;
}) => {
  useDisableBodyScroll();

  return (
    <div
      onClick={() => {
        setIsDeleteModalOpen(false);
        setIsActionsModalOpen(true);
      }}
      className={styles.container}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <h1>Delete tweet?</h1>
        <p>
          This can’t be undone and it will be removed from your profile, the
          timeline of any accounts that follow you, and from Twitter search
          results.
        </p>

        <button className={styles.delete}>Delete</button>
        <button
          className={styles.cancel}
          onClick={() => {
            setIsDeleteModalOpen(false);
            setIsActionsModalOpen(true);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
