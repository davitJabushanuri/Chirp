"use client";
import { AnimatePresence } from "framer-motion";
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
  const path = pathname?.split("/")[1];
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    path === "search"
      ? decodeURIComponent(searchParams?.get("query") || "")
      : "",
  );

  console.log(searchParams.get("query"));

  const deleteQuery = (path: string) => {
    if (path !== "search") {
      setQuery("");
    }
    closeResultsModal();
    router.push(path);
  };

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
    <form
      id="search-container"
      className={styles.container}
      aria-label="Search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        deleteQuery(`/search?query=${query}`);
      }}
    >
      <label htmlFor="search">
        <div className={styles.icon}>
          <SearchIcon />
        </div>
        <input
          aria-autocomplete="list"
          aria-label="Search query"
          aria-activedescendant="search-results-dropdown"
          aria-owns="search-results-dropdown"
          aria-controls="search-results-dropdown"
          autoComplete="off"
          autoCorrect="off"
          role="combobox"
          spellCheck="false"
          enterKeyHint="search"
          aria-expanded={isResultsModalOpen}
          id="search"
          value={query}
          type="text"
          placeholder="Search"
          list="search-results-dropdown"
          name="search"
          onChange={(e) => {
            handleChange(e);
            if (!isResultsModalOpen) {
              openResultsModal();
            }
          }}
          onFocus={() => {
            openResultsModal();
          }}
        />

        <button
          aria-label="Clear"
          tabIndex={-1}
          type="button"
          onClick={() => setQuery("")}
          className={`${styles.close} ${query ? styles.visible : ""}`}
        >
          <SearchCloseIcon />
        </button>
      </label>
      <AnimatePresence>
        {isResultsModalOpen && (
          <SearchResultsModal query={debounceValue} deleteQuery={deleteQuery} />
        )}
      </AnimatePresence>
    </form>
  );
};
