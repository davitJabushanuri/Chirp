import Image from "next/image";

import styles from "./styles/no-bookmarks.module.scss";

export const NoBookmarks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            src="/no-bookmarks.png"
            alt="No bookmarks"
            width={500}
            height={500}
          />
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
