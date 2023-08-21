"use client";

import { Explore } from "@/features/explore";
import { ExploreHeader } from "@/features/header";

export const DefaultClientPage = () => {
  return (
    <div>
      <ExploreHeader />
      <Explore />
    </div>
  );
};
