"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { SearchIcon } from "@/assets/search-icon";
import { useDebounce } from "@/hooks";

import { SearchCloseIcon } from "../assets/search-close-icon";
import { useSearchStore } from "../stores/use-search";

import { SearchResultsModal } from "./search-results-modal";
import styles from "./styles/search.module.scss";

export const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    pathname?.split("/")[1] === "search"
      ? decodeURIComponent(searchParams?.get("query") || "")
      : "",
  );

  const isResultsModalOpen = useSearchStore(
    (state) => state.isResultsModalOpen,
  );
  const openResultsModal = useSearchStore((state) => state.openResultsModal);
  const closeResultsModal = useSearchStore((state) => state.closeResultsModal);

  const debounceValue = useDebounce(query, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form
        onFocus={() => {
          openResultsModal();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?query=${query}`);
          closeResultsModal();
          setQuery("");
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
          <button
            type="button"
            onClick={() => setQuery("")}
            className={styles.close}
          >
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
            <SearchResultsModal query={debounceValue} setQuery={setQuery} />
          </div>
        </div>
      )}
    </div>
  );
};
