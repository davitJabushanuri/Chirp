import { useInfiniteQuery } from "@tanstack/react-query";

import { getTweets } from "../api/get-tweets";

export const useTweets = () => {
  const data = useInfiniteQuery(
    ["tweets"],
    ({ pageParam = "" }) =>
      getTweets({
        pageParam,
        limit: 20,
      }),

    {
      getNextPageParam: (lastPage) => {
        return lastPage?.nextId ?? false;
      },
      refetchOnWindowFocus: false,
    },
  );

  return data;
};
