"use client";
import { Gear } from "@/assets/gear-icon";
import { BackButton } from "@/components/designs/back-button";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { Search, useSearchStore } from "@/features/search";

import styles from "./styles/explore-header.module.scss";

export const ExploreHeader = () => {
  const isResultsModalOpen = useSearchStore(
    (state) => state.isResultsModalOpen,
  );
  const closeResultsModal = useSearchStore((state) => state.closeResultsModal);

  return (
    <div className={styles.container}>
      {isResultsModalOpen ? (
        <button
          className={styles.back}
          onClick={() => {
            closeResultsModal();
          }}
        >
          <BackButton />
        </button>
      ) : (
        <HamburgerButton />
      )}

      <div className={styles.search}>
        <Search />
      </div>
      <button className={styles.options}>
        <Gear />
      </button>
    </div>
  );
};
