import { InfiniteData, QueryClient } from "@tanstack/react-query";

import { IInfiniteChat } from "../hooks/use-get-chat";
import { INewMessage } from "../types";

export const updateQueryData = (
  message: INewMessage,
  conversation_id: string | undefined,
  queryClient: QueryClient,
) => {
  queryClient.setQueryData(
    ["chat", conversation_id],
    (oldData: InfiniteData<IInfiniteChat>) => {
      const lastPage = oldData.pages?.at(0);
      if (lastPage?.chat && lastPage.chat.length >= 20) {
        return {
          ...oldData,
          pages: [
            {
              chat: [message],
              nextId: message.id,
            },
            ...oldData.pages,
          ],
        };
      } else {
        return {
          ...oldData,
          pages: [
            {
              chat: [message, ...(lastPage?.chat ?? [])],
              nextId: lastPage?.nextId,
            },
            ...oldData.pages.slice(1),
          ],
        };
      }
    },
  );
};
