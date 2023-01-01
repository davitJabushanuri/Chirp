import { useQuery, useQueryClient } from "@tanstack/react-query";

import getTweet from "../api/get-tweet";
import { ITweet } from "../types";

export const useTweet = (id: string | undefined) => {
  const queryClient = useQueryClient();
  return useQuery<ITweet>(
    ["tweets", id],
    async () => {
      return getTweet(id);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["tweets", id], data);
      },
    },
  );
};
