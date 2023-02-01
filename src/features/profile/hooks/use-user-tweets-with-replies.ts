import { useQuery } from "@tanstack/react-query";

import { ITweet } from "@/features/tweets";

import { getUserTweetsWithReplies } from "../api/get-user-tweets-with-replies";

export const useUserTweetsWithReplies = (id: string | undefined) => {
  // const queryClient = useQueryClient();
  return useQuery<ITweet[]>(
    ["tweets", { userId: id }, "with replies"],
    async () => {
      return getUserTweetsWithReplies(id);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
