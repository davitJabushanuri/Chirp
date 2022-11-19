import { useState } from "react";

import { SearchClose } from "../assets/SearchClose";
import { SearchIcon } from "../assets/SearchIcon";

import styles from "./styles/Search.module.scss";

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
            <SearchClose />
          </button>
        )}
      </form>
    </div>
  );
};
