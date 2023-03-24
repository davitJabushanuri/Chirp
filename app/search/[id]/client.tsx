"use client";

import { ExploreHeader } from "@/components/layout/header";
import { SearchResults } from "@/features/search";

export const SearchClientPage = () => {
  return (
    <div>
      <ExploreHeader />
      <SearchResults />
    </div>
  );
};
