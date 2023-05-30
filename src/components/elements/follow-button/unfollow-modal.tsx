/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useFollow } from "@/features/profile";

import styles from "./styles/unfollow-modal.module.scss";

export const UnfollowModal = ({
  username = "user",
  userId,
  followerId,
  setIsModalOpen,
}: {
  username: string | undefined;
  userId: string;
  followerId: string;
  setIsModalOpen: (value: boolean) => void;
}) => {
  const mutation = useFollow();

  return (
    <div
      onClick={() => {
        setIsModalOpen(false);
      }}
      className={styles.container}
    >
      <div className={styles.modal}>
        <h1>Unfollow @{username}?</h1>
        <p>
          Their Tweets will no longer show up in your home timeline. You can
          still view their profile, unless their Tweets are protected.
        </p>

        <button
          onClick={() => {
            mutation.mutate({
              followerId,
              userId,
            });
          }}
          className={styles.unfollow}
        >
          Unfollow
        </button>
        <button onClick={() => setIsModalOpen(false)} className={styles.cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
