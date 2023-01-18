import { useFollow } from "@/features/profile";

import styles from "./styles/follow-button.module.scss";

export const FollowButton = ({
  followerId,
  userId,
  isFollowing = false,
}: {
  followerId: string;
  userId: string;
  isFollowing: boolean;
}) => {
  const mutation = useFollow();

  return (
    <button
      onClick={() =>
        mutation.mutate({
          followerId,
          userId,
        })
      }
      className={isFollowing ? styles.following : styles.follow}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};
