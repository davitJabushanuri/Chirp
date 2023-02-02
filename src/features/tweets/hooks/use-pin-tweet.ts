import { useMutation, useQueryClient } from "@tanstack/react-query";

import { pinTweet } from "../api/pin-tweet";
import { unpinTweet } from "../api/unpin-tweet";

export const usePinTweet = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      tweetId,
      userId,
      action,
    }: {
      tweetId: string | undefined;
      userId: string;
      action: string;
    }) => {
      return action === "pin" ? pinTweet(tweetId, userId) : unpinTweet(userId);
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
