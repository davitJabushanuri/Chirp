import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getHashtags } from "../api/get-hashtags";
import { IHashtag } from "../types";

export const useHashtags = () => {
  const queryClient = useQueryClient();
  return useQuery<IHashtag[]>(
    ["hashtags"],
    async () => {
      return getHashtags();
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["hashtags"], data);
      },
    },
  );
};
