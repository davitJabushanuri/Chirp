import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleRetweet } from "../api/handle-retweet";

export const useRetweet = () => {
  const QueryClient = useQueryClient();

  return useMutation(
    ({ tweetId, userId }: { tweetId: string; userId: string }) => {
      return handleRetweet(tweetId, userId);
    },
    {
      onSuccess: () => {
        QueryClient.invalidateQueries(["tweets"]);
        QueryClient.invalidateQueries(["users"]);
      },

      onError: (error: any) => {
        console.log(error);
      },

      onSettled: () => {},
    },
  );
};
