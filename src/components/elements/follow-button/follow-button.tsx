/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useState } from "react";

import { useFollow } from "@/features/profile";

import styles from "./styles/follow-button.module.scss";
import { UnfollowModal } from "./unfollow-modal";

export const FollowButton = ({
  userId,
  username,
  followerId,
  isFollowing = false,
}: {
  username: string;
  userId: string;
  followerId: string;
  isFollowing: boolean | undefined;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState<"Following" | "Unfollow">("Following");

  const mutation = useFollow();

  return (
    <div className={styles.container}>
      {isFollowing ? (
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          onMouseEnter={() => setText("Unfollow")}
          onMouseOut={() => setText("Following")}
          className={styles.following}
        >
          {text}
        </button>
      ) : (
        <button
          onClick={() =>
            mutation.mutate({
              followerId,
              userId,
            })
          }
          className={styles.follow}
        >
          Follow
        </button>
      )}

      {isModalOpen && (
        <UnfollowModal
          username={username}
          userId={userId}
          followerId={followerId}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};
