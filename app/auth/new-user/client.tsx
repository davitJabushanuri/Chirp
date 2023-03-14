"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import styles from "./styles/new-user.module.scss";

export const NewUserClientPage = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <h1>Welcome to Chirp!</h1>
      <p className={styles.description}>
        Chirp is a Twitter clone designed to mimic the features and
        functionality of the popular social media platform. It&apos;s a project
        I built to demonstrate my proficiency in web development.
      </p>

      <p className={styles.link}>
        To get started, head over to your profile page by clicking{" "}
        <Link href={`/${session?.user?.id}`}>here</Link>.
      </p>
      <span>
        Once you&apos;re on your profile page, you can upload a profile picture
        and update your personal information.
      </span>

      <div className={styles.warning}>
        <span>!</span>
        <p>
          Please do not share any sensitive information on Chirp. This is a
          project solely for demonstration purposes and in not intended for
          real-world use.
        </p>
      </div>
    </div>
  );
};
