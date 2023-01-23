import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AddToBookmarks } from "../api/add-to-bookmarks";
import { RemoveFromBookmarks } from "../api/remove-from-bookmarks";

export const useBookmark = ({
  tweetAuthorId,
  sessionOwnerId,
}: {
  tweetAuthorId: string | undefined;
  sessionOwnerId: string | undefined;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
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
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tweets"]);
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