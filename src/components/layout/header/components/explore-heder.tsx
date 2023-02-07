import { Gear } from "@/assets/gear-icon";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { Search } from "@/features/search";

import styles from "./styles/explore-header.module.scss";

export const ExploreHeader = () => {
  return (
    <div className={styles.container}>
      <HamburgerButton />

      <div className={styles.search}>
        <Search />
      </div>
      <button className={styles.options}>
        <Gear />
      </button>
    </div>
  );
};
