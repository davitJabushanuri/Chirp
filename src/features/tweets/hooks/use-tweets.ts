"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getTweets } from "../api/get-tweets";

export const useTweets = ({
  queryKey,
  type,
  id,
}: {
  queryKey?: string[];
  type?: string;
  id?: string;
}) => {
  const data = useInfiniteQuery(
    queryKey ?? ["tweets"],
    ({ pageParam = "" }) =>
      getTweets({
        pageParam,
        limit: 20,
        type,
        id,
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
