"use client";
import { usePathname, useRouter } from "next/navigation";

import styles from "./styles/followers-header.module.scss";

export const FollowersHeader = () => {
  const pathname = usePathname();
  const path = pathname?.split("/")[2];
  const id = pathname?.split("/")[1];
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        onClick={() => router.push(`/${id}/followers`)}
        className={path === `followers` ? styles.active : ""}
      >
        <span className={styles.placeholder}></span>
        <span className={styles.text}>Followers</span>
        <span className={styles.line}></span>
      </button>
      <button
        onClick={() => router.push(`/${id}/following`)}
        className={path === `following` ? styles.active : ""}
      >
        <span className={styles.placeholder}></span>
        <span className={styles.text}>Following</span>
        <span className={styles.line}></span>
      </button>
    </div>
  );
};
