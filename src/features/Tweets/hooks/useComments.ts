import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getComments } from "../api/get-comments";
import { ITweet } from "../types";

export const useComments = (id: string | undefined) => {
  const queryClient = useQueryClient();
  return useQuery<ITweet[]>(
    ["comments"],
    async () => {
      return getComments(id);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["tweets"], data);
      },
    },
  );
};
