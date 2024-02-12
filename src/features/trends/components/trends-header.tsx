"use client";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { Gear } from "@/assets/gear-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { Header } from "@/features/header";

export const TrendsHeader = () => {
  const router = useRouter();

  return (
    <Header>
      <Tooltip text="Back">
        <Button
          aria-label="Back"
          onClick={() => {
            router.back();
          }}
          className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
        >
          <BackArrowIcon />
        </Button>
      </Tooltip>

      <h2>Trends</h2>
      <div className="ml-auto">
        <Tooltip text="Settings">
          <Button
            role="link"
            onClick={() => {
              router.push(`/settings/notifications`);
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
