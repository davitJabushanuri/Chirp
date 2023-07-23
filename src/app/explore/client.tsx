"use client";

import { Explore } from "@/features/explore";
import { ExploreHeader, Header } from "@/features/header";

export const ExploreClientPage = () => {
  return (
    <div>
      <Header>
        <ExploreHeader />
      </Header>
      <Explore />
    </div>
  );
};
