/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { useDisableBodyScroll } from "@/hooks";
import { useTweetModal } from "@/stores/use-create-tweet-modal";

import { CreateTweet } from "./create-tweet";
import styles from "./styles/create-tweet-modal.module.scss";

export const CreateTweetModal = () => {
  const closeModal = useTweetModal((state) => state.closeModal);

  useDisableBodyScroll();

  return (
    <div onClick={() => closeModal()} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <button onClick={() => closeModal()} className={styles.close}>
          <span className={styles.arrow}>
            <BackArrowIcon />
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
