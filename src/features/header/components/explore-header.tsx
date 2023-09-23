"use client";
import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseButton } from "@/components/elements/close-button";
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
    <CloseButton
      onClick={() => {
        closeResultsModal();
      }}
      ariaLabel="Back"
      title="Back"
    >
      <BackArrowIcon />
    </CloseButton>
  );
};
