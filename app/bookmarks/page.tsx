"use client";

import { BookmarksHeader } from "@/components/layout/header";

import styles from "./styles/bookmarks.module.scss";

const Bookmarks = () => {
  return (
    <div className={styles.container}>
      <BookmarksHeader />
    </div>
  );
};

export default Bookmarks;
