"use client";

import { BookmarksHeader } from "@/components/layout/header";
import { Bookmarks } from "@/features/bookmarks";

import styles from "./styles/bookmarks.module.scss";

const BookmarksPage = () => {
  return (
    <div className={styles.container}>
      <BookmarksHeader />

      <div className={styles.bookmarks}>
        <Bookmarks />
      </div>
    </div>
  );
};

export default BookmarksPage;
