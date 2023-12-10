"use client";

import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Connect } from "@/features/connect";
import { InfiniteTweets, useTweets } from "@/features/tweets";

import { PinnedTweet } from "./pinned-tweet";
import styles from "./styles/profile-tweets.module.scss";

export const ProfileTweets = () => {
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
    queryKey: ["tweets", id],
    type: "user_tweets",
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
      {/* {isSuccess && tweets?.length === 0 && (
        <div className={styles.noTweets}>
          {user?.id === session?.user?.id ? (
            <div>
              <h1>You haven&apos;t tweeted anything yet.</h1>
              <p>When you do, it&apos;ll show up here.</p>
            </div>
          ) : (
            <div>
              <h1>
                @{user?.email?.split("@")[0]} hasn&apos;t tweeted anything yet.
              </h1>
              <p>When they do, it&apos;ll show up here.</p>
            </div>
          )}
        </div>
      )} */}

      <PinnedTweet userId={id} />

      {/* {isSuccess && tweets?.length > 0 && (
        <div className={styles.tweets}>
          {tweets?.map((tweet: ITweet) => {
            return (
              <div className={styles.tweetContainer} key={tweet?.id}>
                <Tweet tweet={tweet} />
              </div>
            );
          })}
        </div>
      )} */}

      <InfiniteTweets
        tweets={tweets}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isSuccess={isSuccess}
      />
      <Connect />
    </div>
  );
};
