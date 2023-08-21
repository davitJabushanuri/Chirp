"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { useJoinTwitter } from "@/features/auth";
import { useFollow } from "@/features/profile";

import styles from "./styles/follow-button.module.scss";
import { UnfollowModal } from "./unfollow-modal";

export const FollowButton = ({
  user_id,
  username,
  session_owner_id,
  isFollowing = false,
}: {
  username: string | undefined;
  user_id: string;
  session_owner_id: string;
  isFollowing?: boolean;
}) => {
  const { data: session } = useSession();

  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState<"Following" | "Unfollow">("Following");

  const mutation = useFollow("follow");

  return (
    <div className={styles.container}>
      {isFollowing ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
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
          onBlur={() => setText("Following")}
          className={styles.following}
        >
          {text}
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!session) {
              setJoinTwitterData({
                isModalOpen: true,
                action: "follow",
                user: username,
              });
            } else
              mutation.mutate({
                user_id,
                session_owner_id,
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
          user_id={user_id}
          session_owner_id={session_owner_id}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};
