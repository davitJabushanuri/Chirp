import { useQuery } from "@tanstack/react-query";

import { ITweet } from "@/features/tweets";

import { getUserTweetsWithMedia } from "../api/get-user-tweets-with-media";

export const useUserTweetsWithMedia = (id: string | undefined) => {
  return useQuery<ITweet[]>(
    ["tweets", { userId: id }, "with media"],
    async () => {
      return getUserTweetsWithMedia(id);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
