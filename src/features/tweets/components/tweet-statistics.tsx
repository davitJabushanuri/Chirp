import { useState } from "react";

import { IUser } from "@/features/profile";

import { ILike } from "../types";

import styles from "./styles/tweet-statistics.module.scss";
import { TweetStatisticsModal } from "./tweet-statistics-modal";

export const TweetStatistics = ({
  retweet_count = 0,
  quote_count = 0,
  likes,
}: {
  retweet_count: number | undefined;
  quote_count: number | undefined;
  likes: ILike[] | undefined;
}) => {
  const isVisible = retweet_count > 0 || quote_count > 0 || likes?.length;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authors, setAuthors] = useState<IUser[]>([]);
  const [title, setTitle] = useState<string>("");

  return (
    <div
      className={`${styles.container} ${isVisible ? styles.show : styles.hide}`}
    >
      {/* retweets */}
      {retweet_count > 0 && (
        <button
          onClick={() => {
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
            setAuthors(likes?.map((like) => like.user));
            setTitle("Liked By");
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
          authors={authors}
          title={title}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};
