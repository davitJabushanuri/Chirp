"use client";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";

import { Header } from "./header";

export const TweetHeader = () => {
  const router = useRouter();
  return (
    <Header>
      <Tooltip text="Back">
        <Button
          aria-label="Back"
          onClick={() => {
            router.back();
          }}
          className="hover:bg-neutral-500/80 focus-visible:bg-neutral-500/80 focus-visible:outline-secondary-100  active:bg-neutral-600/80"
        >
          <BackArrowIcon />
        </Button>
      </Tooltip>
      <h2>Home</h2>
    </Header>
  );
};
