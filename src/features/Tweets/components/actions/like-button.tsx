import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { toggleLike } from "../../api/toggle-like";
import { HeartIcon, HeartIconActive } from "../../assets/heart-icon";
import { ILike } from "../../types";

import styles from "./styles/actions.module.scss";

export const LikeButton = ({
  tweetId,
  tweetAuthorId,
  likes,
  smallIcons = true,
}: {
  tweetId: string;
  tweetAuthorId: string;
  likes?: ILike[];
  smallIcons?: boolean;
}) => {
  const { data: session } = useSession();
  const hasLiked = likes?.some((like) => like.user_id === session?.user?.id);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ tweetId, userId }: { tweetId: string; userId: string }) =>
      toggleLike({ tweetId, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tweets"]);
        queryClient.invalidateQueries(["users", session?.user?.id]);
        if (session?.user?.id !== tweetAuthorId)
          queryClient.invalidateQueries(["users", tweetAuthorId]);
      },
      onError: () => {
        console.log("error");
      },
    },
  );

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!session) return;
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
      {smallIcons && likes && likes?.length > 0 && (
        <span className={styles.stats}>{likes?.length}</span>
      )}
    </button>
  );
};
