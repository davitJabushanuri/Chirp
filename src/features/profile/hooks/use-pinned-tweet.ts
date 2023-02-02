import { useQuery } from "@tanstack/react-query";

import { ITweet } from "@/features/tweets";

import { getPinnedTweet } from "../api/get-pinned-tweet";

export const usePinnedTweet = (id: string | undefined) => {
  // const queryClient = useQueryClient();
  return useQuery<ITweet>(
    ["tweets", { userId: id }, `pinned`],
    async () => {
      return getPinnedTweet(id);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
