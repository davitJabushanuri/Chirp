import { useInfiniteQuery } from "@tanstack/react-query";

import { getChat } from "../api/get-chat";
import { IMessage } from "../types";

interface IInfiniteChat {
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
  });

  return {
    data: response.data?.pages.flatMap((page) => page.chat),
    isLoading: response.isLoading,
    isError: response.isError,
    isFetchingNextPage: response.isFetchingNextPage,
    fetchNextPage: response.fetchNextPage,
    hasNextPage: response.hasNextPage,
  };
};
