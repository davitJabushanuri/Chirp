"use client";
import { SearchIcon } from "@/assets/search-icon";
import { Progressbar } from "@/components/designs/progressbar";

import { SearchCloseIcon } from "../assets/search-close-icon";
import { useSearch } from "../stores/use-search";

import styles from "./styles/search.module.scss";

export const Search = () => {
  const query = useSearch((state) => state.query);
  const setQuery = useSearch((state) => state.setQuery);

  const isResultsModalOpen = useSearch((state) => state.isResultsModalOpen);
  const openResultsModal = useSearch((state) => state.openResultsModal);
  const closeResultsModal = useSearch((state) => state.closeResultsModal);

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
          onChange={(e) => setQuery(e.target.value)}
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
        <>
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
        </>
      )}
    </div>
  );
};
