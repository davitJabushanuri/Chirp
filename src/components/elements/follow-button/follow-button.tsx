"use client";

/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useSession } from "next-auth/react";
import { useState } from "react";

import { useJoinTwitter } from "@/features/auth";
import { useFollow } from "@/features/profile";

import styles from "./styles/follow-button.module.scss";
import { UnfollowModal } from "./unfollow-modal";

export const FollowButton = ({
  userId,
  username,
  followerId,
  isFollowing = false,
}: {
  username: string | undefined;
  userId: string;
  followerId: string;
  isFollowing: boolean | undefined;
}) => {
  const { data: session } = useSession();

  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState<"Following" | "Unfollow">("Following");

  const mutation = useFollow();

  return (
    <div className={styles.container}>
      {isFollowing ? (
        <button
          onClick={() => {
            if (!session) {
              setJoinTwitterData({
                isModalOpen: true,
                action: "follow",
                user: username,
              });
            } else setIsModalOpen(true);
          }}
          onMouseEnter={() => setText("Unfollow")}
          onMouseOut={() => setText("Following")}
          className={styles.following}
        >
          {text}
        </button>
      ) : (
        <button
          onClick={() => {
            if (!session) {
              setJoinTwitterData({
                isModalOpen: true,
                action: "follow",
                user: username,
              });
            } else
              mutation.mutate({
                followerId,
                userId,
              });
          }}
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
