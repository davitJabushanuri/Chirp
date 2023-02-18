import { useState } from "react";

import { SearchIcon } from "@/assets/search-icon";

import { SearchCloseIcon } from "../assets/search-close-icon";

import styles from "./styles/search.module.scss";

export const Search = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className={styles.container}>
      <form>
        <div className={styles.icon}>
          <SearchIcon />
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search Twitter"
        />
        {search && (
          <button onClick={() => setSearch("")} className={styles.close}>
            <SearchCloseIcon />
          </button>
        )}
      </form>
    </div>
  );
};
