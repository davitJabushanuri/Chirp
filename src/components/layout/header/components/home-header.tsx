import { HamburgerButton } from "@/components/elements/hamburger-button";
import { SortTweets } from "@/components/elements/sort-tweets";

import styles from "./styles/home-header.module.scss";

export const HomeHeader = () => {
  return (
    <div className={styles.container}>
      <HamburgerButton />

      <a href="#home" className={styles.home}>
        Home
      </a>

      <div className={styles.star}>
        <SortTweets />
      </div>
    </div>
  );
};
