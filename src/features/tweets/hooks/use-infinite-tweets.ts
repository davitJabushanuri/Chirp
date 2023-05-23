import { useInfiniteQuery } from "@tanstack/react-query";

import getTweets from "../api/get-tweets";

export const useInfiniteTweets = () => {
  return useInfiniteQuery(
    ["tweets"],
    ({ pageParam = 0 }) => getTweets(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.length !== 0 ? nextPage : undefined;
      },
    },
  );
};
