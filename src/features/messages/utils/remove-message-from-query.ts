import { InfiniteData, QueryClient } from "@tanstack/react-query";

import { IInfiniteChat } from "../hooks/use-get-chat";

export const removeMessageFromQueryData = (
  messageId: string,
  conversation_id: string | undefined,
  queryClient: QueryClient,
) => {
  queryClient.setQueryData(
    ["chat", conversation_id],
    (oldData: InfiniteData<IInfiniteChat>) => {
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          chat: page.chat.filter((message) => message.id !== messageId),
        })),
      };
    },
  );
};
