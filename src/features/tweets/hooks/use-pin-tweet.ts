import { useMutation, useQueryClient } from "@tanstack/react-query";

import { pinTweet } from "../api/pin-tweet";

export const usePinTweet = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ tweetId, userId }: { tweetId: string | undefined; userId: string }) => {
      return pinTweet(tweetId, userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tweets"]);
      },
      onError: () => {
        console.log("error");
      },
    },
  );
};
