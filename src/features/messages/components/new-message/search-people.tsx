import { SearchIcon } from "@/assets/search-icon";

import styles from "./styles/search-people.module.scss";

export const SearchPeople = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor="people">
        <span className={styles.icon}>
          <SearchIcon />
        </span>
        <input
          type="text"
          id="people"
          placeholder="Search people"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </label>
    </div>
  );
};
