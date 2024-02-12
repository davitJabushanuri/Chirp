"use client";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { Gear } from "@/assets/gear-icon";
import { Button } from "@/components/elements/button";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { Tooltip } from "@/components/elements/tooltip";
import { Search, useSearchStore } from "@/features/search";

import { Header } from "./header";

export const ExploreHeader = () => {
  const router = useRouter();
  const isResultsModalOpen = useSearchStore(
    (state) => state.isResultsModalOpen,
  );
  const closeResultsModal = useSearchStore((state) => state.closeResultsModal);

  return (
    <Header>
      {isResultsModalOpen ? (
        <Tooltip text="Back">
          <Button
            aria-label="Back"
            onClick={() => {
              closeResultsModal();
            }}
            className="hover:bg-neutral-500/80 focus-visible:bg-neutral-500/80 focus-visible:outline-secondary-100  active:bg-neutral-600/80"
          >
            <BackArrowIcon />
          </Button>
        </Tooltip>
      ) : (
        <HamburgerButton />
      )}

      <div className="flex-1">
        <Search />
      </div>

      <div className="ml-auto">
        <Tooltip text="Settings">
          <Button
            role="link"
            onClick={() => {
              router.push(`/settings/messages`);
            }}
            aria-label="Settings"
            className="hover:bg-neutral-500/80 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100  active:bg-neutral-600"
          >
            <Gear />
          </Button>
        </Tooltip>
      </div>
    </Header>
  );
};
