"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { ITweet } from "@/features/tweets";
import { Tweet } from "@/features/tweets";

import { getUser } from "../api/get-user";
import { IUser } from "../types";

import styles from "./styles/profile-media.module.scss";

export const ProfileMedia = () => {
  const pathname = usePathname();
  const userId = pathname?.split("/")[2];

  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<IUser>(["user", userId], () => getUser(userId));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className={styles.container}>
      {isSuccess && user?.tweets?.length === 0 && (
        <div className={styles.noTweets}>
          <div className={styles.noTweetsText}>
            This account hasn&apos;t tweeted yet
          </div>
        </div>
      )}

      {isSuccess && user?.tweets?.length > 0 && (
        <div className={styles.tweets}>
          {user?.tweets
            ?.filter((tweet) => {
              return tweet?.media && tweet?.media?.length > 0;
            })
            .map((tweet: ITweet) => {
              return <Tweet key={tweet.id} tweet={tweet} />;
            })}
        </div>
      )}
    </div>
  );
};
