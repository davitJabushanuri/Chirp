import { motion } from "framer-motion";

import styles from "./styles/confirmation-modal.module.scss";

export const ConfirmationModal = ({
  heading,
  paragraph,
  confirmButtonText,
  confirmButtonClick,
  confirmButtonStyle = "delete",
  cancelButtonText,
  cancelButtonClick,
  logo,
}: {
  heading: string;
  paragraph: string;
  confirmButtonText: string;
  confirmButtonClick: () => void;
  confirmButtonStyle: "delete" | "unfollow" | "logout";
  cancelButtonText: string;
  cancelButtonClick: () => void;
  logo?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className={styles.container}
    >
      {logo && <div className={styles.logo}>{logo}</div>}
      <h1>{heading}</h1>
      <p>{paragraph}</p>

      <div className={styles.buttons}>
        <button
          onClick={confirmButtonClick}
          className={`${styles.confirm} ${
            styles[confirmButtonStyle as "delete" | "unfollow" | "logout"]
          }
        }`}
        >
          {confirmButtonText}
        </button>
        <button onClick={cancelButtonClick} className={styles.cancel}>
          {cancelButtonText}
        </button>
      </div>
    </motion.div>
  );
};
