"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { PenIcon } from "../assets/pen-icon";

export const MobileTweetButton = () => {
  const { data: session } = useSession();
  const openModal = useCreateTweetModal((state) => state.openModal);
  const pathname = usePathname();
  const path = pathname.split("/")[1];

  if (!session || path === "messages") return null;

  return (
    <Tooltip maxWidth={500} text="Tweet">
      <Button
        aria-label="Tweet"
        onClick={() => {
          openModal();
        }}
        className="w-full bg-primary-100 p-[1em] hover:bg-primary-200 focus-visible:outline-secondary-100 active:bg-primary-300"
      >
        <span className="fill-white-100 xxl:hidden [&>svg]:size-h1">
          <PenIcon />
        </span>
      </Button>
    </Tooltip>
  );
};
