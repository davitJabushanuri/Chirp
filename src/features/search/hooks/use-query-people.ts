import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getQueryPeople } from "../api/get-query-people";

export const useQueryPeople = (query: string) => {
  const queryClient = useQueryClient();
  return useQuery(
    ["hashtag-people"],
    async () => {
      return getQueryPeople(query);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["hashtag-people"], data);
      },
    },
  );
};
