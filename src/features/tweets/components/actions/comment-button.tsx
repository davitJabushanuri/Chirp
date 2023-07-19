import { useSession } from "next-auth/react";

import { CommentIcon } from "@/assets/comment-icon";
import { useJoinTwitter } from "@/features/auth";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { ITweet } from "../../types";

import styles from "./styles/actions.module.scss";

export const CommentButton = ({
  tweet,
  showStats = false,
}: {
  tweet: ITweet;
  showStats: boolean;
}) => {
  const { data: session } = useSession();

  const setParentTweet = useCreateTweetModal((state) => state.setParentTweet);

  const setScreenName = useCreateTweetModal((state) => state.setScreenName);

  const setStatusId = useCreateTweetModal((state) => state.setStatusId);

  const setPlaceholder = useCreateTweetModal((state) => state.setPlaceholder);

  const openModal = useCreateTweetModal((state) => state.openModal);

  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  return (
    <button
      aria-label="Reply"
      data-title="Reply"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();

        if (!session) {
          setJoinTwitterData({
            isModalOpen: true,
            action: "comment",
            user: tweet?.author?.name,
          });
        } else {
          setParentTweet(tweet);
          setScreenName(tweet?.author?.email?.split("@")[0]);
          setStatusId(tweet?.id);
          setPlaceholder(`Tweet your reply`);
          openModal();
        }
      }}
      className={`${styles.container} ${styles.comment}`}
    >
      <span className={`${styles.icon}`}>
        <CommentIcon />
      </span>
      {showStats && tweet?.comments?.length > 0 && (
        <span className={styles.stats}>{tweet?.comments?.length}</span>
      )}
    </button>
  );
};
