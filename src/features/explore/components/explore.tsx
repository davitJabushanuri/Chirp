"use client";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Trends } from "@/features/trends";
import { InfiniteTweets, useTweets } from "@/features/tweets";

import styles from "./styles/explore.module.scss";

export const Explore = () => {
  const {
    data: tweets,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTweets({});

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.trends}>
        <Trends title={`Trends for you`} />
      </div>

      <div className={styles.scores}></div>

      <div className={styles.tweets}>
        <InfiniteTweets
          tweets={tweets}
          isSuccess={isSuccess}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
};
