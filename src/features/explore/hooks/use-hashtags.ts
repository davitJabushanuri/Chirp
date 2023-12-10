import { useQuery } from "@tanstack/react-query";

import { getHashtags } from "../api/get-hashtags";
import { IHashtag } from "../types";

export const useHashtags = () => {
  return useQuery<IHashtag[]>({
    queryKey: ["hashtags"],
    queryFn: async () => {
      return getHashtags();
    },

    refetchOnWindowFocus: false,
  });
};
