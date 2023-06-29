/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useFollow } from "@/features/profile";

import styles from "./styles/unfollow-modal.module.scss";

export const UnfollowModal = ({
  username = "user",
  user_id,
  session_owner_id,
  setIsModalOpen,
}: {
  username: string | undefined;
  user_id: string;
  session_owner_id: string;
  setIsModalOpen: (value: boolean) => void;
}) => {
  const mutation = useFollow("unfollow");

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
              user_id,
              session_owner_id,
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
