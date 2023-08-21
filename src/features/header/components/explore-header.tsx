"use client";

import { BackButton } from "@/components/designs/back-button";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { Search, useSearchStore } from "@/features/search";

import { HeaderSettings } from "./header-settings";
import styles from "./styles/explore-header.module.scss";

export const ExploreHeader = () => {
  const isResultsModalOpen = useSearchStore(
    (state) => state.isResultsModalOpen,
  );

  return (
    <div className={styles.container}>
      {isResultsModalOpen ? <CloseSearchResultsModal /> : <HamburgerButton />}

      <Search />

      <HeaderSettings href={`/settings/explore`} ariaLabel="Settings" />
    </div>
  );
};

const CloseSearchResultsModal = () => {
  const closeResultsModal = useSearchStore((state) => state.closeResultsModal);
  return (
    <button
      aria-label="Back"
      tabIndex={0}
      className={styles.back}
      onClick={() => {
        closeResultsModal();
      }}
    >
      <BackButton />
    </button>
  );
};
