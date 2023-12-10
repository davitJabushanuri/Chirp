import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeleteAllBookmarks } from "../api/delete-all-bookmarks";

export const useDeleteAllBookmarks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string | undefined }) => {
      return DeleteAllBookmarks(userId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
    onError: () => {
      console.log("error");
    },
  });
};
