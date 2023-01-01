"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Tweet } from "@/features/tweets";

import { getUser } from "../api/get-user";
import { IUser } from "../types";

import styles from "./styles/profile-media.module.scss";

export const ProfileMedia = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<IUser>(["users", id], () => getUser(id));

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
            .map((tweet) => {
              return <Tweet key={tweet.id} tweet={tweet} />;
            })}
        </div>
      )}
    </div>
  );
};
