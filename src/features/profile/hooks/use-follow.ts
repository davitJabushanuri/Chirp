import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleFollow } from "../api/toggle-follow";

export const useFollow = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ followerId, userId }: { followerId: string; userId: string }) => {
      return toggleFollow(followerId, userId);
    },

    {
      onSuccess: () => {
        console.log("success");
      },

      onError: () => {
        console.log("error");
      },

      onSettled: ({ userId, followerId }) => {
        queryClient.invalidateQueries(["users", userId]);
        queryClient.invalidateQueries(["users", followerId]);
        queryClient.invalidateQueries(["tweets"]);
      },
    },
  );
};
