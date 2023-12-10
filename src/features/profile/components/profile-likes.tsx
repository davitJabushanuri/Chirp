"use client";

import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { InfiniteTweets, useTweets } from "@/features/tweets";

import styles from "./styles/profile-likes.module.scss";

export const ProfileLikes = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[1] as string;

  const {
    data: tweets,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTweets({
    queryKey: ["tweets", id, "likes"],
    type: "user_likes",
    id,
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.error}>
        <TryAgain />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* {isSuccess && likes?.length === 0 && (
        <div className={styles.noLikes}>
          {session?.user?.id === id ? (
            <div>
              <h1>You don&apos;t have any likes yet</h1>
              <p>
                <span>Tap the heart on any tweet to show it some love.</span>{" "}
                <span>When you do, it&apos;ll show up here.</span>
              </p>
            </div>
          ) : (
            <div>
              <h1>
                @{user?.email?.split("@")[0]} hasn&apos;t liked any tweets
              </h1>
              <p>
                <span>When they do, those Tweets will show up here.</span>
              </p>
            </div>
          )}
        </div>
      )} */}

      <InfiniteTweets
        tweets={tweets}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isSuccess={isSuccess}
      />
    </div>
  );
};
