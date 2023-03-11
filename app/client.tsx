"use client";

import { ExploreHeader } from "@/components/layout/header";
import { Explore } from "@/features/explore";

export const DefaultClientPage = () => {
  return (
    <div>
      <ExploreHeader />
      <Explore />
    </div>
  );
};
