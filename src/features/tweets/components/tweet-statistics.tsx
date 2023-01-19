import { useState } from "react";

import { ILike, IRetweet, ITweet } from "../types";

import styles from "./styles/tweet-statistics.module.scss";
import { TweetStatisticsModal } from "./tweet-statistics-modal";

export const TweetStatistics = ({
  retweet_count = 0,
  quote_count = 0,
  likes,
  retweets,
  quotes,
}: {
  retweet_count: number | undefined;
  quote_count: number | undefined;
  likes: ILike[] | undefined;
  retweets: IRetweet[] | undefined;
  quotes: ITweet[] | undefined;
}) => {
  const isVisible = retweet_count > 0 || quote_count > 0 || likes?.length;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string>("");

  return (
    <div
      className={`${styles.container} ${isVisible ? styles.show : styles.hide}`}
    >
      {/* retweets */}
      {retweet_count > 0 && (
        <button
          onClick={() => {
            setTitle("retweets");
            setIsModalOpen(true);
          }}
          className={styles.statistic}
        >
          <span className={styles.number}>{retweet_count}</span>
          <span className={styles.text}>
            {retweet_count === 1 ? `Retweet` : `Retweets`}
          </span>
        </button>
      )}

      {/* quote tweets */}
      {quote_count > 0 && (
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className={styles.statistic}
        >
          <span className={styles.number}>{quote_count}</span>
          <span className={styles.text}>
            {quote_count === 1 ? `Quote Tweet` : `Quote Tweets`}
          </span>
        </button>
      )}

      {/* likes */}
      {likes && likes.length > 0 && (
        <button
          onClick={() => {
            setTitle("likes");
            setIsModalOpen(true);
          }}
          className={styles.statistic}
        >
          <span className={styles.number}>{likes?.length}</span>
          <span className={styles.text}>
            {likes?.length === 1 ? `Like` : `Likes`}
          </span>
        </button>
      )}

      {isModalOpen && (
        <TweetStatisticsModal
          authors={(title === "likes" ? likes : retweets)?.map(
            (item) => item?.user,
          )}
          title={title}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};
