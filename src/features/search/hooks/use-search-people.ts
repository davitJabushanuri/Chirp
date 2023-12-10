import { useQuery } from "@tanstack/react-query";

import { IUser } from "@/features/profile";

import { getQueryPeople } from "../api/get-query-people";

export const useSearchPeople = (query: string | undefined) => {
  return useQuery<IUser[]>({
    queryKey: ["people", "query: ", query],
    queryFn: async () => {
      return getQueryPeople(query);
    },
    refetchOnWindowFocus: false,

    enabled: !!query,
  });
};
