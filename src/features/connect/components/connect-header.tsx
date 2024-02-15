"use client";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { Header } from "@/features/header";

export const ConnectHeader = () => {
  const router = useRouter();

  return (
    <Header>
      <Tooltip text="Back">
        <Button
          onClick={() => {
            router.back();
          }}
          aria-label="Back"
          className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
        >
          <BackArrowIcon />
        </Button>
      </Tooltip>
      <h2>Connect</h2>
    </Header>
  );
};
