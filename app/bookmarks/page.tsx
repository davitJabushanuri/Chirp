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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      <BookmarksHeader
        hasBookmarks={bookmarks?.length > 0}
        username={session?.user?.email?.split("@")[0]}
        userId={session?.user?.id}
      />

      <div className={styles.bookmarks}>
        <Bookmarks bookmarks={bookmarks} />
      </div>
    </div>
  );
};

export default BookmarksPage;
