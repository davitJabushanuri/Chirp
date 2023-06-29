import { Avatar } from "@/components/designs/avatar";

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
      className={styles.container}
    >
      <span className={styles.avatar}>
        <Avatar userImage={image} height={38} width={38} />
      </span>
      <span className={styles.text}>Tweet your reply!</span>
      <span className={styles.button}>Reply</span>
    </button>
  );
};
