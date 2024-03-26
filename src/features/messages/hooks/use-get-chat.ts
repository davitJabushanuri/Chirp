import { useInfiniteQuery } from "@tanstack/react-query";

import { getChat } from "../api/get-chat";
import { IMessage } from "../types";

export interface IInfiniteChat {
  nextId: string;
  chat: IMessage[];
}

export const useChat = (conversation_id: string | undefined) => {
  const response = useInfiniteQuery<IInfiniteChat>({
    queryKey: ["chat", conversation_id],
    queryFn: ({ pageParam }) => {
      return getChat({ conversation_id, pageParam, limit: 20 });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage?.nextId;
    },

    select: (data) => {
      const pages = data?.pages?.map((page) => {
        if (page && page.chat) {
          return {
            ...page,
            chat: page.chat.concat().reverse(),
          };
        }

        return page;
      });

      return {
        pages: pages.concat().reverse(),
        pageParams: data.pageParams.concat().reverse(),
      };
    },
  });

  return {
    data: response.data,
    isLoading: response.isLoading,
    isError: response.isError,
    isFetchingNextPage: response.isFetchingNextPage,
    fetchNextPage: response.fetchNextPage,
    hasNextPage: response.hasNextPage,
  };
};
