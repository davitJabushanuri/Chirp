"use client";
import { useEffect } from "react";

import { SearchIcon } from "@/assets/search-icon";
import { Progressbar } from "@/components/designs/progressbar";
import { useDebounce } from "@/hooks/use-debounce";

import { SearchCloseIcon } from "../assets/search-close-icon";
import { useSearch } from "../stores/use-search";

import styles from "./styles/search.module.scss";

export const Search = () => {
  const query = useSearch((state) => state.query);
  const setQuery = useSearch((state) => state.setQuery);

  const isResultsModalOpen = useSearch((state) => state.isResultsModalOpen);
  const openResultsModal = useSearch((state) => state.openResultsModal);
  const closeResultsModal = useSearch((state) => state.closeResultsModal);

  const debounceValue = useDebounce(query, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    console.log(query);
  }, [debounceValue]);

  return (
    <div className={styles.container}>
      <form
        onFocus={() => {
          openResultsModal();
        }}
      >
        <div className={styles.icon}>
          <SearchIcon />
        </div>
        <input
          value={query}
          onChange={handleChange}
          type="text"
          placeholder="Search Twitter"
        />
        {query && (
          <button onClick={() => setQuery("")} className={styles.close}>
            <SearchCloseIcon />
          </button>
        )}
      </form>

      {isResultsModalOpen && (
        <div className={styles.modal}>
          <button
            onClick={() => closeResultsModal()}
            className={styles.underlay}
          >
            hello
          </button>
          <div className={styles.results}>
            <Progressbar />
            <div className={styles.placeholder}>
              Try searching for people, topics, or keywords
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
