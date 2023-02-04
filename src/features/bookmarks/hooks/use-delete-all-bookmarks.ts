import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeleteAllBookmarks } from "../api/delete-all-bookmarks";

export const useDeleteAllBookmarks = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ userId }: { userId: string | undefined }) => {
      return DeleteAllBookmarks(userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookmarks"]);
        queryClient.invalidateQueries(["tweets"]);
      },
      onError: () => {
        console.log("error");
      },
    },
  );
};
