"use client";
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

  const setData = useCreateTweetModal((state) => state.setData);
  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  return (
    <button
      aria-label="Reply"
      data-title="Reply"
      tabIndex={0}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();

        if (!session) {
          setJoinTwitterData({
            isModalOpen: true,
            action: "comment",
            user: tweet?.author?.name,
          });
        } else {
          setData({
            quoted_tweet: null,
            parent_tweet: tweet,
            in_reply_to_screen_name:
              tweet?.author?.email?.split("@")[0] ?? null,
            in_reply_to_status_id: tweet?.id,
            placeholder: `Tweet your reply`,
          });
        }
      }}
      className={`${styles.container} ${styles.comment}`}
    >
      <span className={`${styles.icon}`}>
        <CommentIcon />
      </span>
      {showStats && tweet?._count?.comments > 0 && (
        <span className={styles.stats}>{tweet?._count?.comments}</span>
      )}
    </button>
  );
};
