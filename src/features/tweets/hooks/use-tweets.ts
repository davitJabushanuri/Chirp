import { useInfiniteQuery } from "@tanstack/react-query";

import { getTweets } from "../api/get-tweets";

export const useTweets = () => {
  return useInfiniteQuery(
    ["tweets"],
    ({ pageParam = "" }) =>
      getTweets({
        pageParam,
        limit: 10,
      }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextId ?? false;
      },
    },
  );
};
