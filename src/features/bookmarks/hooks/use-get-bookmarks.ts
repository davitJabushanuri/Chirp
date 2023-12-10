import { useQuery } from "@tanstack/react-query";

import { getBookmarks } from "../api/get-bookmarks";
import { IBookmark } from "../types";

export const useGetBookmarks = (id: string | undefined) => {
  return useQuery<IBookmark[]>({
    queryKey: ["bookmarks", { userId: id }],
    queryFn: async () => {
      return getBookmarks(id);
    },

    refetchOnWindowFocus: false,
  });
};
