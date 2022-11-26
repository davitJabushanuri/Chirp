import { useModal } from "@/stores/useModal";

import { Pen } from "../assets/pen";

import styles from "./styles/TweetButton.module.scss";

export const TweetButton = () => {
  const openModal = useModal((state) => state.openModal);

  return (
    <button onClick={() => openModal()} className={styles.container}>
      <div className={styles.icon}>
        <Pen />
      </div>
      <div className={styles.text}>Tweet</div>
    </button>
  );
};
