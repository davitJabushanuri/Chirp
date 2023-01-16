import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { CommentIcon } from "../../assets/comment-icon";
import { ITweet } from "../../types";

import styles from "./styles/actions.module.scss";

export const CommentButton = ({ tweet }: { tweet: ITweet }) => {
  const setParentTweet = useCreateTweetModal((state) => state.setParentTweet);

  const setScreenName = useCreateTweetModal((state) => state.setScreenName);

  const setStatusId = useCreateTweetModal((state) => state.setStatusId);

  const setPlaceholder = useCreateTweetModal((state) => state.setPlaceholder);

  const openModal = useCreateTweetModal((state) => state.openModal);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setParentTweet(tweet);
        setScreenName(tweet?.author?.email?.split("@")[0]);
        setStatusId(tweet?.id);
        setPlaceholder(`Tweet your reply`);
        openModal();
      }}
      className={`${styles.container} ${styles.comment}`}
    >
      <span className={`${styles.icon}`}>
        <CommentIcon />
      </span>
      {tweet?.comments?.length > 0 && (
        <span className={styles.stats}>{tweet?.comments?.length}</span>
      )}
    </button>
  );
};
