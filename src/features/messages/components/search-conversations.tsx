/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { SearchIcon } from "@/assets/search-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";

import { XICon } from "../assets/x-icon";

import styles from "./styles/search-conversations.module.scss";

export const SearchConversations = ({
  searchTerm,
  setSearchTerm,
  isSearching,
  setIsSearching,
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}) => {
  return (
    <div className={styles.container}>
      {isSearching && (
        <Tooltip text="Back">
          <Button
            aria-label="Back"
            onClick={() => {
              setSearchTerm("");
              setIsSearching(false);
            }}
            className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
          >
            <BackArrowIcon />
          </Button>
        </Tooltip>
      )}

      <div
        onClick={() => setIsSearching(true)}
        className={styles.inputContainer}
      >
        <label className={isSearching ? styles.active : ""} htmlFor="text">
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            id="text"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Direct Messages"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className={styles.clearInput}
            >
              <XICon />
            </button>
          )}
        </label>
      </div>
    </div>
  );
};
