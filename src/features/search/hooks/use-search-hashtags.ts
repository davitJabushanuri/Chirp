import { useQuery, useQueryClient } from "@tanstack/react-query";

import { IHashtag } from "@/features/explore";

import { getQueryHashtags } from "../api/get-query-hashtags";

export const useSearchHashtags = (query: string | undefined) => {
  const queryClient = useQueryClient();

  return useQuery<IHashtag[]>(
    ["search-hashtags", query],
    async () => {
      return getQueryHashtags(query);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["search-hashtags"], data);
      },
      enabled: !!query,
    },
  );
};
