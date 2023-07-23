"use client";
import Link from "next/link";

import { Gear } from "@/assets/gear-icon";
import { BackButton } from "@/components/designs/back-button";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { Search, useSearchStore } from "@/features/search";

import styles from "./styles/explore-header.module.scss";

export const ExploreHeader = () => {
  const isResultsModalOpen = useSearchStore(
    (state) => state.isResultsModalOpen,
  );

  return (
    <div className={styles.container}>
      {isResultsModalOpen ? <CloseSearchResultsModal /> : <HamburgerButton />}

      <Search />

      <Link
        href={`/settings/explore`}
        aria-label="Settings"
        data-title="Settings"
        className={styles.options}
      >
        <Gear />
      </Link>
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
