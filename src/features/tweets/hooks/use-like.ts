import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleLike } from "../api/toggle-like";

export const useLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tweetId,
      userId,
    }: {
      tweetId: string | undefined;
      userId: string;
    }) => {
      return toggleLike({ tweetId, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
    onError: () => {
      console.log("error");
    },
  });
};
