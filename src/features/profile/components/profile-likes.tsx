"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Tweet } from "@/features/tweets";

import { useUserLikes } from "../hooks/use-user-likes";

import styles from "./styles/profile-likes.module.scss";

export const ProfileLikes = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  const { data: likes, isLoading, isError, isSuccess } = useUserLikes(id);

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
      {isSuccess && likes?.length === 0 && (
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
              <h1>user hasn&apos;t liked any tweets</h1>
              <p>
                <span>When they do, those Tweets will show up here.</span>
              </p>
            </div>
          )}
        </div>
      )}

      {isSuccess &&
        likes.length > 0 &&
        likes?.map((like) => {
          return (
            <div className={styles.tweetContainer} key={like?.id}>
              <Tweet tweet={like?.tweet} />
            </div>
          );
        })}
    </div>
  );
};
