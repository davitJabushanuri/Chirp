"use client";

import { useState } from "react";

import { SearchIcon } from "@/assets/search-icon";

import { SearchCloseIcon } from "../assets/search-close-icon";

import styles from "./styles/search.module.scss";

export const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <form
        onFocus={() => {
          setIsModalOpen(true);
        }}
      >
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

      {isModalOpen && (
        <>
          <button
            onClick={() => setIsModalOpen(false)}
            className={styles.underlay}
          >
            hello
          </button>
          <div className={styles.results}>
            <div className={styles.placeholder}>
              Try searching for people, topics, or keywords
            </div>
          </div>
        </>
      )}
    </div>
  );
};
