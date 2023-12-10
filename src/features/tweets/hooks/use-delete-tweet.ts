import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTweet } from "../api/delete-tweet";

export const useDeleteTweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tweetId }: { tweetId: string }) => {
      return deleteTweet(tweetId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
