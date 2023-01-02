import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postTweet } from "../api/post-tweet";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { text: string; userId: string; files: File[] }) => {
      return postTweet(data);
    },
    {
      onSuccess: () => {
        console.log("success");
      },
      onError: () => {
        console.log("error");
      },
      onSettled: () => {
        queryClient.invalidateQueries(["tweets"]);
      },
    },
  );
};
