import { useQuery } from "@tanstack/react-query";

import { ITweet } from "@/features/tweets";

import { getUserTweets } from "../api/get-user-tweets";

export const useUserTweets = (id: string | undefined) => {
  // const queryClient = useQueryClient();
  return useQuery<ITweet[]>(
    ["tweets", { userId: id }],
    async () => {
      return getUserTweets(id);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};