import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleRetweet } from "../api/handle-retweet";

export const useRetweet = (setIsModalOpen: (isModalOpen: boolean) => void) => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tweetId, userId }: { tweetId: string; userId: string }) => {
      return handleRetweet(tweetId, userId);
    },

    onMutate: () => {
      setIsModalOpen(false);
    },

    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["tweets"] });
    },

    onError: (error: any) => {
      console.log(error);
    },

    onSettled: () => {},
  });
};
