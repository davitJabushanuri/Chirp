import { useQuery, useQueryClient } from "@tanstack/react-query";

import { IUser } from "@/features/profile";

import { getQueryPeople } from "../api/get-query-people";

export const useSearchPeople = (query: string | undefined) => {
  const queryClient = useQueryClient();

  return useQuery<IUser[]>(
    ["search-people", query],
    async () => {
      return getQueryPeople(query);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["hashtag-people"], data);
      },
      enabled: !!query,
    },
  );
};
