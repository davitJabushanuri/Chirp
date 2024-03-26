import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { socket } from "@/lib/socket-io";

import { SocketEmitMessagePayload, SocketEmitStatusPayload } from "../types";

import { IInfiniteChat } from "./use-get-chat";

export const useSocketEvents = (conversation_id: string | undefined) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("status", (data: SocketEmitStatusPayload) => {
      queryClient.setQueryData(
        ["chat", conversation_id],

        (oldData: InfiniteData<IInfiniteChat>) => {
          const newData = oldData?.pages?.map((page) => {
            if (page) {
              const newChat = page.chat.map((message) => {
                if (message.id === data.message_id) {
                  return { ...message, status: data.status };
                }

                return message;
              });

              return { ...page, chat: newChat };
            }
          });

          return { ...oldData, pages: newData };
        },
      );
    });

    socket.on("message", (data: SocketEmitMessagePayload) => {
      queryClient.setQueryData(
        ["chat", conversation_id],
        (oldData: InfiniteData<IInfiniteChat>) => {
          const lastPage = oldData.pages?.at(0);

          if (lastPage?.chat && lastPage.chat.length >= 20) {
            return {
              ...oldData,
              pages: [
                {
                  chat: [data.message],
                  nextId: data.message.id,
                },
                ...oldData.pages,
              ],
            };
          } else {
            return {
              ...oldData,
              pages: [
                {
                  chat: [data.message, ...(lastPage?.chat ?? [])],
                  nextId: lastPage?.nextId,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );
    });

    return () => {
      socket.off("message");
      socket.off("status");
    };
  }, [conversation_id, queryClient]);
};
