import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTweet } from "../api/delete-tweet";

export const useDeleteTweet = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ tweetId }: { tweetId: string }) => {
      return deleteTweet(tweetId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tweets"]);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
