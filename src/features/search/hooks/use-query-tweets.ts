import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ITweet } from "@/features/tweets";

import { getQueryTweets } from "./../api/get-query-tweets";

export const useQueryTweets = (query: string | undefined) => {
  const queryClient = useQueryClient();
  return useQuery<ITweet[]>(
    ["hashtag-tweets"],
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
