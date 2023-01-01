import { useQuery, useQueryClient } from "@tanstack/react-query";

import getTweets from "../api/get-tweets";
import { ITweet } from "../types";

export const useTweets = () => {
  const queryClient = useQueryClient();
  return useQuery<ITweet[]>(
    ["tweets"],
    async () => {
      return getTweets();
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["tweets"], data);
      },
    },
  );
};
