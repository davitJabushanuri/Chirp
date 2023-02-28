import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { PenIcon } from "../assets/pen-icon";

import styles from "./styles/tweet-button.module.scss";

export const TweetButton = () => {
  const openModal = useCreateTweetModal((state) => state.openModal);

  return (
    <button onClick={() => openModal()} className={styles.container}>
      <span className={styles.icon}>
        <PenIcon />
      </span>
      <span className={styles.text}>Tweet</span>
    </button>
  );
};
