"use client";
import { usePathname } from "next/navigation";

import { BackButton } from "@/components/elements/back-button";
import { IUser } from "@/features/profile";

import styles from "./styles/profile-header.module.scss";

export const ProfileHeader = ({ user }: { user: IUser }) => {
  const pathname = usePathname();
  const path = pathname?.split("/")[2] || "";

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      <div className={styles.user}>
        <h2 className={styles.title}>{user?.name}</h2>
        {user?.tweets &&
          (path === "media" ? (
            <span className={styles.stats}>
              {
                user?.tweets?.filter(
                  (tweet) => tweet?.media && tweet?.media?.length > 0,
                )?.length
              }{" "}
              Photos & videos
            </span>
          ) : path === "likes" ? (
            <span className={styles.stats}>
              {user?.likes?.length}{" "}
              {user?.likes?.length === 1 ? "Like" : "Likes"}
            </span>
          ) : (
            <span className={styles.stats}>
              {user?.tweets?.length}{" "}
              {user?.tweets?.length === 1 ? "Tweet" : "Tweets"}
            </span>
          ))}
      </div>
    </div>
  );
};
