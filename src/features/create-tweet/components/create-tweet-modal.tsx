"use client";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { CreateTweet } from "./create-tweet";
import { CreateTweetComment } from "./create-tweet-comment";
import styles from "./styles/create-tweet-modal.module.scss";

export const CreateTweetModal = () => {
  const data = useCreateTweetModal((state) => state.data);
  const closeModal = useCreateTweetModal((state) => state.closeModal);

  const innerWidth = window.innerWidth;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.closeButtonContainer}>
          <button
            data-title={innerWidth < 700 ? "Back" : "Close"}
            onClick={() => closeModal()}
            className={styles.close}
          >
            <span className={styles.arrow}>
              <BackArrowIcon />
            </span>
            <span className={styles.x}>
              <CloseIcon />
            </span>
          </button>
        </div>
        {data.parent_tweet && <CreateTweetComment tweet={data.parent_tweet} />}

        <CreateTweet
          quoted_tweet={data.quoted_tweet}
          in_reply_to_screen_name={data.in_reply_to_screen_name}
          in_reply_to_status_id={data.in_reply_to_status_id}
          placeholder={data.placeholder}
          container="modal"
        />
      </div>
    </div>
  );
};
