import { useSession } from "next-auth/react";

import { HeartIcon, HeartIconActive } from "@/assets/heart-icon";
import { useJoinTwitter } from "@/features/auth";

import { useLike } from "../../hooks/use-like";
import { ILike } from "../../types";

import styles from "./styles/actions.module.scss";

export const LikeButton = ({
  tweetId,
  tweetAuthorId,
  likes,
  smallIcons = true,
  showStats = false,
}: {
  tweetId: string | undefined;
  tweetAuthorId: string | undefined;
  likes?: ILike[];
  smallIcons?: boolean;
  showStats?: boolean;
}) => {
  const { data: session } = useSession();
  const hasLiked = likes?.some((like) => like.user_id === session?.user?.id);

  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  const mutation = useLike({
    tweetAuthorId,
    sessionOwnerId: session?.user?.id,
  });

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!session) {
          setJoinTwitterData({
            isModalOpen: true,
            action: "like",
            user: "user",
          });
        }
        mutation.mutate({ tweetId: tweetId, userId: session?.user?.id });
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
      {showStats && likes && likes?.length > 0 && (
        <span className={styles.stats}>{likes?.length}</span>
      )}
    </button>
  );
};
