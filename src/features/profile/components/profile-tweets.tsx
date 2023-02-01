"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Tweet } from "@/features/tweets";
import { ITweet } from "@/features/tweets";

import { useUser } from "../hooks/use-user";

import { PinnedTweet } from "./pinned-tweet";
import styles from "./styles/profile-tweets.module.scss";

export const ProfileTweets = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  const { data: user, isLoading, isError, isSuccess } = useUser(id);

  console.log("user", user);

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
      )}

      {isSuccess && user?.pinned_tweet && (
        <PinnedTweet pinned_tweet={user?.pinned_tweet?.tweet} />
      )}

      {isSuccess && user?.tweets?.length > 0 && (
        <div className={styles.tweets}>
          {user?.tweets
            ?.filter((tweet) => {
              if (user?.pinned_tweet) {
                return tweet?.id !== user?.pinned_tweet?.tweet?.id;
              }
              return true;
            })
            ?.map((tweet: ITweet) => {
              return (
                <div className={styles.tweetContainer} key={tweet?.id}>
                  <Tweet tweet={tweet} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
