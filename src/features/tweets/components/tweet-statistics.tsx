"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./styles/tweet-statistics.module.scss";

export const TweetStatistics = ({
  retweet_count = 0,
  quote_count = 0,
  likes_count = 0,
  bookmarks_count = 0,
}: {
  retweet_count: number | undefined;
  quote_count: number | undefined;
  likes_count: number | undefined;
  bookmarks_count: number | undefined;
}) => {
  const pathname = usePathname();
  const tweetId = pathname.split(`/`)[2];

  const isVisible =
    retweet_count > 0 ||
    quote_count > 0 ||
    likes_count > 0 ||
    bookmarks_count > 0;

  if (!isVisible) return null;

  return (
    <div
      role="group"
      className={`${styles.container} ${isVisible ? styles.show : styles.hide}`}
    >
      {retweet_count > 0 && (
        <Link href={`/status/${tweetId}/retweets`} className={styles.statistic}>
          <span className={styles.number}>{retweet_count}</span>
          <span className={styles.text}>
            {retweet_count === 1 ? `Retweet` : `Retweets`}
          </span>
        </Link>
      )}

      {quote_count > 0 && (
        <Link href={`/status/${tweetId}/quotes`} className={styles.statistic}>
          <span className={styles.number}>{quote_count}</span>
          <span className={styles.text}>
            {quote_count === 1 ? `Quote Tweet` : `Quote Tweets`}
          </span>
        </Link>
      )}

      {likes_count > 0 && (
        <Link href={`/status/${tweetId}/likes`} className={styles.statistic}>
          <span className={styles.number}>{likes_count}</span>
          <span className={styles.text}>
            {likes_count === 1 ? `Like` : `Likes`}
          </span>
        </Link>
      )}

      {bookmarks_count > 0 && (
        <div className={styles.statistic}>
          <span className={styles.number}>{bookmarks_count}</span>
          <span className={styles.text}>
            {bookmarks_count === 1 ? `Bookmark` : `Bookmarks`}
          </span>
        </div>
      )}
    </div>
  );
};
