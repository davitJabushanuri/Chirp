import { useQuery } from "@tanstack/react-query";

import getTweet from "../api/get-tweet";
import { ITweet } from "../types";

export const useTweet = (id: string | undefined) => {
  return useQuery<ITweet>(
    ["tweets", id],
    async () => {
      return getTweet(id);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
