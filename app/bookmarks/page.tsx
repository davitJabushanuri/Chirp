"use client";
import { useSession } from "next-auth/react";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { BookmarksHeader } from "@/components/layout/header";
import { useUser } from "@/features/profile";
import { Tweet } from "@/features/tweets";

import styles from "./styles/bookmarks.module.scss";

const Bookmarks = () => {
  const { data: session } = useSession();
  const { data: User, isLoading, isError } = useUser(session?.user?.id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      <BookmarksHeader />

      <div className={styles.bookmarks}>
        {User?.bookmarks?.length > 0 &&
          User?.bookmarks?.map((bookmark) => {
            return (
              <div key={bookmark?.id} className={styles.bookmark}>
                <Tweet tweet={bookmark?.tweet} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Bookmarks;
