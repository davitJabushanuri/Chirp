import { Tweet } from "@/features/tweets";

import { IBookmark } from "../types";

import { NoBookmarks } from "./no-bookmarks";
import styles from "./styles/bookmarks.module.scss";

export const Bookmarks = ({ bookmarks }: { bookmarks: IBookmark[] }) => {
  return (
    <div className={styles.container}>
      {bookmarks?.length === 0 ? (
        <NoBookmarks />
      ) : (
        bookmarks.length > 0 &&
        bookmarks?.map((bookmark) => {
          return (
            <div key={bookmark.id} className={styles.tweetContainer}>
              <Tweet tweet={bookmark?.tweet} />
            </div>
          );
        })
      )}
    </div>
  );
};
