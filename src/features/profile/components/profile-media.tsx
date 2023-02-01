/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Tweet } from "@/features/tweets";

import { useUserTweetsWithMedia } from "../hooks/use-user-tweets-with-media";

import styles from "./styles/profile-media.module.scss";

export const ProfileMedia = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  const {
    data: tweets,
    isLoading,
    isError,
    isSuccess,
  } = useUserTweetsWithMedia(id);

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
      {isSuccess && tweets?.length === 0 && (
        <div className={styles.noMedia}>
          {session?.user?.id === id ? (
            <div>
              <img src="/media-placeholder.png" alt="" />
              <h1>Lights, camera ... attachments!</h1>
              <p>
                When you send tweets with photos or videos in them, they will
                show up here.
              </p>
            </div>
          ) : (
            <div>
              <img src="/media-placeholder.png" alt="" />
              <h1>user hasn&apos;t tweeted media</h1>
              <p>Once they do, those Tweets will show up here.</p>
            </div>
          )}
        </div>
      )}

      {isSuccess && tweets?.length > 0 && (
        <div className={styles.tweets}>
          {tweets?.map((tweet) => {
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
