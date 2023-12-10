"use client";
import { useRouter } from "next/navigation";

import styles from "./styles/not-found.module.scss";

export const NotFound = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <p>Hmm...this page doesn’t exist. Try searching for something else.</p>
      <button onClick={() => router.push("/explore")}>Search</button>
    </div>
  );
};
