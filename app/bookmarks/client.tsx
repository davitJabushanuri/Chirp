"use client";
import { Bookmarks } from "@/features/bookmarks";

import styles from "./styles/bookmarks.module.scss";

export const BookmarksClientPage = () => {
  return (
    <div className={styles.container}>
      <Bookmarks />
    </div>
  );
};
