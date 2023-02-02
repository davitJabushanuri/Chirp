import { useQuery } from "@tanstack/react-query";

import { getComments } from "../api/get-comments";
import { ITweet } from "../types";

export const useComments = (id: string | undefined) => {
  return useQuery<ITweet[]>(
    ["tweets", id, "comments"],
    async () => {
      return getComments(id);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
