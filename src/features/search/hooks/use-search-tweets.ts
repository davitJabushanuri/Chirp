import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ITweet } from "@/features/tweets";

import { getQueryTweets } from "../api/get-query-tweets";

export const useSearchTweets = (query: string | undefined) => {
  const queryClient = useQueryClient();

  return useQuery<ITweet[]>(
    ["search-tweets"],
    async () => {
      return getQueryTweets(query);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["hashtag-tweets"], data);
      },
    },
  );
};
