"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Tweet } from "@/features/tweets";

import { getUser } from "../api/get-user";
import { IUser } from "../types";

import styles from "./styles/profile-likes.module.scss";

export const ProfileLikes = () => {
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
      {isSuccess &&
        user?.likes.length > 0 &&
        user?.likes?.map((like) => {
          return <Tweet key={like.id} tweet={like?.tweet} />;
        })}
    </div>
  );
};
