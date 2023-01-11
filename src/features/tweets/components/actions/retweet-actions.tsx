import { QuoteTweetIcon } from "../../assets/quote-tweet-icon";
import { RetweetIcon } from "../../assets/retweet-icon";
import { ITweet } from "../../types";

import styles from "./styles/retweet-actions.module.scss";

export const RetweetActions = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div className={styles.container}>
      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <RetweetIcon />
        </span>
        <span className={styles.text}>Retweet</span>
      </button>

      <button className={styles.actionButton}>
        <span className={styles.icon}>
          <QuoteTweetIcon />
        </span>
        <span className={styles.text}>Quote Tweet</span>
      </button>
    </div>
  );
};
