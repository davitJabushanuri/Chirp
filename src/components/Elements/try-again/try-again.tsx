import { useRouter } from "next/navigation";

import styles from "./styles/try-again.module.scss";

export const TryAgain = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h2 className={styles.text}>Something went wrong. Try reloading</h2>
      <button onClick={() => router.refresh()}>
        <span className={styles.icon}></span>
        <span className={styles.text}>Reload</span>
      </button>
    </div>
  );
};
