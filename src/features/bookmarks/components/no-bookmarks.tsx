/* eslint-disable @next/next/no-img-element */
import styles from "./styles/no-bookmarks.module.scss";

export const NoBookmarks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <img src="/no-bookmarks.png" alt="" />
        </div>
        <h1>Save Tweets for later</h1>
        <p>
          Don’t let the good ones fly away! Bookmark Tweets to easily find them
          again in the future.
        </p>
      </div>
    </div>
  );
};
