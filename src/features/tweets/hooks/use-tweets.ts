import { useInfiniteQuery } from "@tanstack/react-query";

import { getTweets } from "../api/get-tweets";

export const useTweets = ({
  queryKey,
  type,
  id,
  condition,
}: {
  queryKey?: string[];
  type?: string;
  id?: string;
  condition?: string;
}) => {
  const data = useInfiniteQuery(
    queryKey ?? ["tweets"],
    ({ pageParam = "" }) =>
      getTweets({
        pageParam,
        limit: 20,
        type,
        id,
        condition,
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
