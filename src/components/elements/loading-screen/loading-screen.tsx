import { TwitterLogo } from "@/assets/twitter-logo";

import styles from "./styles/loading-screen.module.scss";

export const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <TwitterLogo />
      </div>
    </div>
  );
};
