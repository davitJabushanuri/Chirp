"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Tweet } from "@/features/tweets";
import { ITweet } from "@/features/tweets";

import { getUserTweets } from "../api/get-user-tweets";

import styles from "./styles/profile-tweets.module.scss";

export const ProfileTweets = () => {
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
          {tweets?.map((tweet: ITweet) => {
            return <Tweet key={tweet.id} tweet={tweet} />;
          })}
        </div>
      )}
    </div>
  );
};
