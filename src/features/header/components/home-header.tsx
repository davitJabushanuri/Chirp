import { HamburgerButton } from "@/components/elements/hamburger-button";
import { SortTweets } from "@/components/elements/sort-tweets";

import { HeaderHeading } from "./header-heading";
import styles from "./styles/home-header.module.scss";

export const HomeHeader = () => {
  return (
    <div className={styles.container}>
      <HamburgerButton />
      <HeaderHeading title="Home" />

      <div className={styles.star}>
        <SortTweets />
      </div>
    </div>
  );
};
