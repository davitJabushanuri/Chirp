import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className={styles.container}
    >
      <h2>Unfollow @{username}?</h2>
      <p>
        Their Tweets will no longer show up in your home timeline. You can still
        view their profile, unless their Tweets are protected.
      </p>

      <div className={styles.buttons}>
        <button
          onClick={() => {
            mutation.mutate({
              user_id,
              session_owner_id,
            });
            setIsModalOpen(false);
          }}
          className={styles.unfollow}
        >
          Unfollow
        </button>
        <button onClick={() => setIsModalOpen(false)} className={styles.cancel}>
          Cancel
        </button>
      </div>
    </motion.div>
  );
};
