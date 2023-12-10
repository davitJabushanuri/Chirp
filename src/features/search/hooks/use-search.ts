import { useQuery } from "@tanstack/react-query";

import { IHashtag } from "@/features/explore";
import { IUser } from "@/features/profile";

import { getSearchResults } from "../api/get-search-results";

export const useSearch = (query: string) => {
  return useQuery<{
    people: IUser[];
    hashtags: IHashtag[];
  }>({
    queryKey: ["search", query],
    queryFn: async () => {
      return getSearchResults(query);
    },
    refetchOnWindowFocus: false,
    enabled: !!query,
  });
};
