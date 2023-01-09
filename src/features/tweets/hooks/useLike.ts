import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleLike } from "../api/toggle-like";

export const useLike = ({
  tweetAuthorId,
  sessionOwnerId,
}: {
  tweetAuthorId: string | undefined;
  sessionOwnerId: string | undefined;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ tweetId, userId }: { tweetId: string | undefined; userId: string }) => {
      return toggleLike({ tweetId, userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tweets"]);
        queryClient.invalidateQueries(["comments"]);
        queryClient.invalidateQueries(["users", sessionOwnerId]);
        if (sessionOwnerId !== tweetAuthorId)
          queryClient.invalidateQueries(["users", tweetAuthorId]);
      },
      onError: () => {
        console.log("error");
      },
    },
  );
};
