"use client";
import { useRouter } from "next/navigation";

import { ReloadIcon } from "./assets/reload-icon";
import styles from "./styles/try-again.module.scss";

export const TryAgain = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h2 className={styles.text}>Something went wrong. Try reloading.</h2>
      <button onClick={() => router.refresh()}>
        <span className={styles.icon}>
          <ReloadIcon />
        </span>
        <span className={styles.text}>Retry</span>
      </button>
    </div>
  );
};
