/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Tweet } from "@/features/tweets";

import { getUser } from "../api/get-user";
import { IUser } from "../types";

import styles from "./styles/profile-media.module.scss";

export const ProfileMedia = () => {
  const { data: session } = useSession();
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
              <h1>@{user?.email?.split("@")[0]} hasn&apos;t tweeted media</h1>
              <p>Once they do, those Tweets will show up here.</p>
            </div>
          )}
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
