"use client";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { Button } from "@/components/elements/button";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { Tooltip } from "@/components/elements/tooltip";
import { Header } from "@/features/header";

export const ProfileHeader = ({
  heading,
  stats,
}: {
  heading: string | undefined;
  stats: string | undefined;
}) => {
  const router = useRouter();

  return (
    <Header className="gap-5">
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

      <div>
        <h2 className="text-h2 font-bold text-secondary-100">
          {heading ?? "Profile"}
        </h2>
        <EllipsisWrapper>
          <span className="text-nano font-light text-tertiary-100">
            {stats}
          </span>
        </EllipsisWrapper>
      </div>
    </Header>
  );
};
