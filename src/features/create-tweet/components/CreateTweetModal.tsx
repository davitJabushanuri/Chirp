/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CloseIcon } from "@/assets/CloseIcon";
import { useModal } from "@/stores/useModal";

import { BackArrow } from "../assets/BackArrow";

import { CreateTweet } from "./CreateTweet";
import styles from "./styles/CreateTweetModal.module.scss";

export const CreateTweetModal = () => {
  const closeModal = useModal((state) => state.closeModal);

  return (
    <div onClick={() => closeModal()} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <button onClick={() => closeModal()} className={styles.close}>
          <span className={styles.arrow}>
            <BackArrow />
          </span>
          <span className={styles.x}>
            <CloseIcon />
          </span>
        </button>
        <CreateTweet />
      </div>
    </div>
  );
};
