"use client";
import { useSession } from "next-auth/react";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import {
  Bookmarks,
  BookmarksHeader,
  useGetBookmarks,
} from "@/features/bookmarks";

import styles from "./styles/bookmarks.module.scss";

const BookmarksPage = () => {
  const { data: session } = useSession();

  const {
    data: bookmarks,
    isLoading,
    isError,
  } = useGetBookmarks(session?.user?.id);

  return (
    <div className={styles.container}>
      <BookmarksHeader
        hasBookmarks={bookmarks ? bookmarks?.length > 0 : false}
        username={session?.user?.email?.split("@")[0]}
        userId={session?.user?.id}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <TryAgain />
      ) : (
        <div className={styles.bookmarks}>
          <Bookmarks bookmarks={bookmarks} />
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
