import { useQuery } from "@tanstack/react-query";

import { ITweet } from "@/features/tweets";

import { getPinnedTweet } from "../api/get-pinned-tweet";

export const usePinnedTweet = (id: string | undefined) => {
  return useQuery<ITweet>({
    queryKey: ["tweets", { userId: id }, `pinned`],
    queryFn: async () => {
      return getPinnedTweet(id);
    },
    refetchOnWindowFocus: false,
  });
};
