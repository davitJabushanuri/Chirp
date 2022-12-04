import { Gear } from "@/assets/gear-icon";
import { Search } from "@/features/search";

import styles from "./styles/explore-header.module.scss";

export const ExploreHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Search />
      </div>
      <button>
        <Gear />
      </button>
    </div>
  );
};
