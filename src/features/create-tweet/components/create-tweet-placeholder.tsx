import { Avatar } from "@/features/profile";

import styles from "./styles/create-tweet-placeholder.module.scss";

export const CreateTweetPlaceholder = ({
  image,
  setIsPlaceholder,
}: {
  image: string;
  setIsPlaceholder: (value: boolean) => void;
}) => {
  return (
    <button
      onClick={() => setIsPlaceholder(false)}
      onFocus={() => setIsPlaceholder(false)}
      className={styles.container}
    >
      <span className={styles.avatar}>
        <Avatar userImage={image} />
      </span>
      <span className={styles.text}>Tweet your reply!</span>
      <span className={styles.button}>Reply</span>
    </button>
  );
};
