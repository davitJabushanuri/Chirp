"use client";

import { BackButton } from "@/components/designs/back-button";
import { CloseButton } from "@/components/designs/close-button";
import { useDisableBodyScroll } from "@/hooks";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { CreateTweet } from "./create-tweet";
import { CreateTweetComment } from "./create-tweet-comment";
import styles from "./styles/create-tweet-modal.module.scss";

export const CreateTweetModal = () => {
  const data = useCreateTweetModal((state) => state.data);
  const closeModal = useCreateTweetModal((state) => state.closeModal);

  useDisableBodyScroll();

  return (
    <div
      onClick={() => {
        closeModal();
      }}
      tabIndex={-1}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          closeModal();
        }
      }}
      className={styles.container}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            closeModal();
          }
        }}
        className={styles.modal}
      >
        <button onClick={() => closeModal()} className={styles.close}>
          <span className={styles.arrow}>
            <BackButton />
          </span>
          <span className={styles.x}>
            <CloseButton />
          </span>
        </button>
        {data.parent_tweet && <CreateTweetComment tweet={data.parent_tweet} />}

        <CreateTweet
          quoted_tweet={data.quoted_tweet}
          in_reply_to_screen_name={data.in_reply_to_screen_name}
          in_reply_to_status_id={data.in_reply_to_status_id}
          placeholder={data.placeholder}
        />
      </div>
    </div>
  );
};
