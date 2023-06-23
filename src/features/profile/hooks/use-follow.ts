import { useMutation, useQueryClient } from "@tanstack/react-query";

import { followUser } from "../api/follow-user";
import { unfollowUser } from "../api/unfollow-user";

export const useFollow = (type: "follow" | "unfollow") => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      user_id,
      session_owner_id,
    }: {
      user_id: string;
      session_owner_id: string;
    }) => {
      return type === "follow"
        ? followUser(user_id, session_owner_id)
        : unfollowUser(user_id, session_owner_id);
    },

    {
      onSuccess: () => {
        console.log("success");
      },

      onError: () => {
        console.log("error");
      },

      onSettled: ({ user_id, session_owner_id }) => {
        queryClient.invalidateQueries(["users", user_id]);
        queryClient.invalidateQueries(["users", session_owner_id]);
        queryClient.invalidateQueries(["tweets"]);
      },
    },
  );
};
