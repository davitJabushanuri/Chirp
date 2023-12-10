import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AddToBookmarks } from "../api/add-to-bookmarks";
import { RemoveFromBookmarks } from "../api/remove-from-bookmarks";

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tweetId,
      userId,
      bookmarkId,
      action,
    }: {
      tweetId: string | undefined;
      userId: string;
      bookmarkId?: string;
      action: "add" | "remove";
    }) => {
      return action === "add"
        ? AddToBookmarks({ tweetId, userId })
        : RemoveFromBookmarks(bookmarkId);
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
