import { Pen } from "../assets/pen";

import styles from "./styles/TweetButton.module.scss";

export const TweetButton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Pen />
      </div>
      <div className={styles.text}>Tweet</div>
    </div>
  );
};
