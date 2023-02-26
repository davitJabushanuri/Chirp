import { SearchIcon } from "@/assets/search-icon";

import styles from "./styles/search-people.module.scss";

export const SearchPeople = () => {
  return (
    <div className={styles.container}>
      <label htmlFor="people">
        <span className={styles.icon}>
          <SearchIcon />
        </span>
        <input type="text" id="people" placeholder="Search people" />
      </label>
    </div>
  );
};
