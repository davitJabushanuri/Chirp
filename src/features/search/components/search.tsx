"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { SearchIcon } from "@/assets/search-icon";
import { IUser } from "@/features/profile";
import { useDebounce } from "@/hooks";

import { SearchCloseIcon } from "../assets/search-close-icon";
import { useSearchStore } from "../stores/use-search";

import { SearchResultsModal } from "./search-results-modal";
import styles from "./styles/search.module.scss";

export const Search = () => {
  // const [people, setPeople] = useState<IUser[] | null>(null);
  // const [loading, setLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  const isResultsModalOpen = useSearchStore(
    (state) => state.isResultsModalOpen,
  );
  const openResultsModal = useSearchStore((state) => state.openResultsModal);
  const closeResultsModal = useSearchStore((state) => state.closeResultsModal);

  const debounceValue = useDebounce(query, 800);

  // useEffect(() => {
  //   if (!debounceValue) return;

  //   setLoading(true);
  //   setIsError(false);
  //   // fetch people
  //   axios
  //     .get(`/api/search/people/${debounceValue}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setPeople(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsError(true);
  //       setLoading(false);
  //     });
  // }, [debounceValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

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
            <SearchResultsModal query={debounceValue} />
          </div>
        </div>
      )}
    </div>
  );
};
