/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { useDisableBodyScroll } from "@/hooks";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { CreateTweet } from "./create-tweet";
import styles from "./styles/create-tweet-modal.module.scss";

export const CreateTweetModal = () => {
  const parent_tweet = useCreateTweetModal((state) => state.parent_tweet);
  const quoted_tweet = useCreateTweetModal((state) => state.quoted_tweet);
  const in_reply_to_screen_name = useCreateTweetModal(
    (state) => state.in_reply_to_screen_name,
  );
  const in_reply_to_status_id = useCreateTweetModal(
    (state) => state.in_reply_to_status_id,
  );
  const placeholder = useCreateTweetModal((state) => state.placeholder);
  const closeModal = useCreateTweetModal((state) => state.closeModal);

  useDisableBodyScroll();

  return (
    <div
      onClick={() => {
        closeModal();
      }}
      className={styles.container}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <button onClick={() => closeModal()} className={styles.close}>
          <span className={styles.arrow}>
            <BackArrowIcon />
          </span>
          <span className={styles.x}>
            <CloseIcon />
          </span>
        </button>
        <CreateTweet
          parent_tweet={parent_tweet}
          quoted_tweet={quoted_tweet}
          in_reply_to_screen_name={in_reply_to_screen_name}
          in_reply_to_status_id={in_reply_to_status_id}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
