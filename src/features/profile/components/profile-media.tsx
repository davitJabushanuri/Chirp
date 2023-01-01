"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { ITweet } from "@/features/tweets";
import { Tweet } from "@/features/tweets";

import { getUserTweets } from "../api/get-user-tweets";

import styles from "./styles/profile-media.module.scss";

export const ProfileMedia = () => {
  const pathname = usePathname();
  const userId = pathname?.split("/")[1];

  const {
    data: tweets,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ITweet[]>(["user-tweets", userId], () => getUserTweets(userId));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      {isSuccess && tweets?.length === 0 && (
        <div className={styles.noTweets}>
          <div className={styles.noTweetsText}>
            This account hasn&apos;t tweeted yet
          </div>
        </div>
      )}

      {isSuccess && tweets?.length > 0 && (
        <div className={styles.tweets}>
          {tweets
            ?.filter((tweet) => {
              return tweet?.media && tweet?.media?.length > 0;
            })
            .map((tweet) => {
              return <Tweet key={tweet.id} tweet={tweet} />;
            })}
        </div>
      )}
    </div>
  );
};
