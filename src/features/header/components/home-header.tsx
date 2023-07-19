import { HamburgerButton } from "@/components/elements/hamburger-button";
import { SortTweets } from "@/components/elements/sort-tweets";

import styles from "./styles/home-header.module.scss";

export const HomeHeader = () => {
  return (
    <div className={styles.container}>
      <HamburgerButton />

      <h2 className={styles.home}>Home</h2>

      <div className={styles.star}>
        <SortTweets />
      </div>
    </div>
  );
};
