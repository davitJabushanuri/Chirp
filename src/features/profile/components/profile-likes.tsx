"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Tweet } from "@/features/tweets";

import { getUserLikes } from "../api/get-user-likes";
import { ILike } from "../types";

import styles from "./styles/profile-likes.module.scss";

export const ProfileLikes = () => {
  const pathname = usePathname();
  const userId = pathname?.split("/")[1];

  const {
    data: likes,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ILike[]>(["user-likes", userId], () => {
    return getUserLikes(userId);
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      {isSuccess &&
        likes.length > 0 &&
        likes?.map((like) => {
          return <Tweet key={like.id} tweet={like?.tweet} />;
        })}
    </div>
  );
};
