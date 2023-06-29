import { BackButton } from "@/components/designs/back-button";
import { CloseButton } from "@/components/designs/close-button";
import { useDisableBodyScroll } from "@/hooks";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { CreateTweet } from "./create-tweet";
import { CreateTweetComment } from "./create-tweet-comment";
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
        {parent_tweet && <CreateTweetComment tweet={parent_tweet} />}

        <CreateTweet
          quoted_tweet={quoted_tweet}
          in_reply_to_screen_name={in_reply_to_screen_name}
          in_reply_to_status_id={in_reply_to_status_id}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
