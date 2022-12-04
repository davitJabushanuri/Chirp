import { useModal } from "@/stores/useModal";

import { PenIcon } from "../assets/pen-icon";

import styles from "./styles/tweet-button.module.scss";

export const TweetButton = () => {
  const openModal = useModal((state) => state.openModal);

  return (
    <button onClick={() => openModal()} className={styles.container}>
      <div className={styles.icon}>
        <PenIcon />
      </div>
      <div className={styles.text}>Tweet</div>
    </button>
  );
};
