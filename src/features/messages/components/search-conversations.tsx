import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { SearchIcon } from "@/assets/search-icon";

import { XICon } from "../assets/x-icon";

import styles from "./styles/search-conversations.module.scss";

export const SearchConversations = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) => {
  return (
    <div className={styles.container}>
      <button onClick={() => setSearch("")} className={styles.backButton}>
        <BackArrowIcon />
      </button>

      <div className={styles.inputContainer}>
        <label htmlFor="text">
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            id="text"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Direct Messages"
          />

          <button onClick={() => setSearch("")} className={styles.clearInput}>
            <XICon />
          </button>
        </label>
      </div>
    </div>
  );
};
