/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { SearchIcon } from "@/assets/search-icon";
import { CloseButton } from "@/components/elements/close-button";

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
        <CloseButton
          onClick={() => {
            setSearchTerm("");
            setIsSearching(false);
          }}
          ariaLabel="Back"
          title="Back"
        >
          <BackArrowIcon />
        </CloseButton>
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
