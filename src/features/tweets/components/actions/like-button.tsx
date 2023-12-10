import { useSession } from "next-auth/react";

import { HeartIcon, HeartIconActive } from "@/assets/heart-icon";
import { useJoinTwitter } from "@/features/auth";

import { useLike } from "../../hooks/use-like";
import { ITweet } from "../../types";

import styles from "./styles/actions.module.scss";

export const LikeButton = ({
  tweet,
  smallIcons = true,
  showStats = false,
}: {
  tweet?: ITweet;
  smallIcons?: boolean;
  showStats?: boolean;
}) => {
  const { data: session } = useSession();
  const hasLiked = tweet?.likes?.some(
    (like) => like.user_id === session?.user?.id,
  );

  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  const mutation = useLike();

  return (
    <button
      aria-label={hasLiked ? "Unlike" : "Like"}
      data-title={hasLiked ? "Unlike" : "Like"}
      tabIndex={0}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!session) {
          setJoinTwitterData({
            isModalOpen: true,
            action: "like",
            user: tweet?.author?.name || "user",
          });
        }
        mutation.mutate({ tweetId: tweet?.id, userId: session?.user?.id });
      }}
      className={`${styles.container} ${styles.like} ${
        hasLiked ? styles.liked : ""
      } `}
    >
      <span
        className={`${styles.icon} ${
          smallIcons ? styles.smallIcon : styles.bigIcons
        }`}
      >
        {hasLiked ? <HeartIconActive /> : <HeartIcon />}
      </span>
      {showStats && tweet?.likes && tweet?.likes?.length > 0 && (
        <span className={styles.stats}>{tweet?.likes?.length}</span>
      )}
    </button>
  );
};
