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
      return {
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      };
    },
  });

  const chat = response?.data?.pages?.reduce((acc, page) => {
    if (page && page.chat) {
      const reversedChat = [...page.chat].reverse();
      return [...acc, ...reversedChat];
    }

    return acc;
  }, [] as IMessage[]);

  return {
    data: chat,
    isLoading: response.isLoading,
    isError: response.isError,
    isFetchingNextPage: response.isFetchingNextPage,
    fetchNextPage: response.fetchNextPage,
    hasNextPage: response.hasNextPage,
  };
};
