import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getSearchResults } from "../api/get-search-results";

export const useSearch = (query: string) => {
  const queryClient = useQueryClient();
  return useQuery(
    ["search"],
    async () => {
      return getSearchResults(query);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["search"], data);
      },
    },
  );
};
