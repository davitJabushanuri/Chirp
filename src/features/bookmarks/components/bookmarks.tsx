import { useSession } from "next-auth/react";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Tweet } from "@/features/tweets";

import { useGetBookmarks } from "../hooks/use-get-bookmarks";

import { NoBookmarks } from "./no-bookmarks";
import styles from "./styles/bookmarks.module.scss";

export const Bookmarks = () => {
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
      {bookmarks?.length === 0 ? (
        <NoBookmarks />
      ) : (
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
