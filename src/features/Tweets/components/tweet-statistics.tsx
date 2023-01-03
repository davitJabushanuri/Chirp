import { ILike } from "../types";

import styles from "./styles/tweet-statistics.module.scss";

export const TweetStatistics = ({
  retweet_count = 0,
  quote_count = 0,
  likes,
}: {
  retweet_count: number | undefined;
  quote_count: number | undefined;
  likes: ILike[] | undefined;
}) => {
  return (
    <div className={styles.container}>
      {/* retweets */}
      {retweet_count > 0 && (
        <div className={styles.statistic}>
          <span className={styles.number}>{retweet_count}</span>
          <span className={styles.text}>Retweets</span>
        </div>
      )}

      {/* quote tweets */}
      {quote_count > 0 && (
        <div className={styles.statistic}>
          <span className={styles.number}>{quote_count}</span>
          <span className={styles.text}>Quote Tweets</span>
        </div>
      )}

      {/* likes */}
      {likes && likes.length > 0 && (
        <div className={styles.statistic}>
          <span className={styles.number}>{likes?.length}</span>
          <span className={styles.text}>
            {likes?.length === 1 ? `Like` : `Likes`}
          </span>
        </div>
      )}
    </div>
  );
};
