"use client";
import { ProfileTweets } from "@/features/profile";

import styles from "./styles/profile.module.scss";

export const ProfileClientPage = () => {
  return (
    <div className={styles.container}>
      <ProfileTweets />
    </div>
  );
};
