"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { Modal } from "@/components/elements/modal";
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

  const mutation = useFollow("follow");

  const buttonText = isFollowing ? "Following" : "Follow";

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!session) {
      setJoinTwitterData({
        isModalOpen: true,
        action: "follow",
        user: username,
      });
    } else {
      if (isFollowing) {
        setIsModalOpen(true);
      } else {
        mutation.mutate({
          user_id,
          session_owner_id,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <button
        aria-label={`${buttonText} @${username}`}
        aria-describedby="follow-button-description"
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          handleFollow(e);
        }}
        onMouseEnter={(e) => {
          e.currentTarget.textContent = isFollowing ? "Unfollow" : "Follow";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.textContent = isFollowing ? "Following" : "Follow";
        }}
        className={isFollowing ? styles.following : styles.follow}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>

      <div
        id="follow-button-description"
        className="visually-hidden"
      >{`Click to ${isFollowing ? "unfollow" : "follow"} ${username}`}</div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            disableScroll={true}
            background="var(--clr-modal-background)"
            closeOnBackdropClick={true}
          >
            <UnfollowModal
              username={username}
              user_id={user_id}
              session_owner_id={session_owner_id}
              setIsModalOpen={setIsModalOpen}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
