import { useQuery } from "@tanstack/react-query";

import getTweet from "../api/get-tweet";
import { ITweet } from "../types";

export const useTweet = ({
  id,
  initialData,
}: {
  id: string;
  initialData?: ITweet;
}) => {
  return useQuery<ITweet>(
    ["tweets", id],
    async () => {
      return getTweet(id);
    },
    {
      refetchOnWindowFocus: false,
      initialData: initialData ?? undefined,
    },
  );
};
