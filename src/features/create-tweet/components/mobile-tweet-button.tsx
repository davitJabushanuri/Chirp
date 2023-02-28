import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { PenIcon } from "../assets/pen-icon";

import styles from "./styles/mobile-tweet-button.module.scss";

export const MobileTweetButton = () => {
  const openModal = useCreateTweetModal((state) => state.openModal);

  return (
    <button onClick={() => openModal()} className={styles.container}>
      <PenIcon />
    </button>
  );
};
