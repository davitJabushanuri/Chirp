"use client";
import { useSession } from "next-auth/react";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Header } from "@/features/header";
import { InfiniteTweets, useTweets } from "@/features/tweets";

import { BookmarksHeader } from "./bookmarks-header";
import { NoBookmarks } from "./no-bookmarks";
import styles from "./styles/bookmarks.module.scss";

export const Bookmarks = () => {
  const { data: session } = useSession();

  const {
    data: bookmarks,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTweets({
    queryKey: ["bookmarks", session?.user?.id],
    type: "bookmarks",
    id: session?.user?.id,
  });

  if (isLoading) {
    return (
      <>
        <Header>
          <BookmarksHeader
            hasBookmarks={false}
            username={session?.user?.email?.split("@")[0]}
            userId={session?.user?.id}
          />
        </Header>
        <LoadingSpinner />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header>
          <BookmarksHeader
            hasBookmarks={false}
            username={session?.user?.email?.split("@")[0]}
            userId={session?.user?.id}
          />
        </Header>
        <TryAgain />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Header>
        <BookmarksHeader
          hasBookmarks={
            bookmarks ? bookmarks?.pages[0]?.tweets?.length > 0 : false
          }
          username={session?.user?.email?.split("@")[0]}
          userId={session?.user?.id}
        />
      </Header>

      {isSuccess && bookmarks?.pages[0]?.tweets?.length === 0 ? (
        <NoBookmarks />
      ) : (
        <InfiniteTweets
          tweets={bookmarks}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
};
