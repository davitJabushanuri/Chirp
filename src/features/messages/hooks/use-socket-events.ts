import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { socket } from "@/lib/socket-io";

import {
  IMessage,
  SocketEmitMessagePayload,
  SocketEmitStatusPayload,
} from "../types";

export const useSocketEvents = (conversation_id: string | undefined) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("status", (data: SocketEmitStatusPayload) => {
      queryClient.setQueryData(
        ["chat", conversation_id],

        (oldData: IMessage[]) => {
          const newData = oldData.map((message: IMessage) => {
            if (message.id === data.message_id) {
              return {
                ...message,
                status: data.status,
              };
            }
            return message;
          });
          return newData;
        },
      );
    });

    socket.on("message", (data: SocketEmitMessagePayload) => {
      queryClient.setQueryData(
        ["chat", conversation_id],
        (oldData: IMessage[]) => {
          const newData = [...oldData, data.message];
          return newData;
        },
      );
    });

    return () => {
      socket.off("message");
      socket.off("status");
    };
  }, [conversation_id, queryClient]);
};
