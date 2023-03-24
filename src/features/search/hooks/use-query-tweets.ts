import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getQueryTweets } from "./../api/get-query-tweets";

export const useQueryTweets = (query: string) => {
  const queryClient = useQueryClient();
  return useQuery(
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
