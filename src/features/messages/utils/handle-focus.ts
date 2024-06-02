import type { InfiniteData, QueryClient } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";

import { IInfiniteChat } from "../hooks/use-get-chat";

export const handleFocus = (
  queryClient: QueryClient,
  socket: Socket,
  sender_id: string | undefined,
  conversation_id: string | undefined,
) => {
  const chat = queryClient.getQueryData<InfiniteData<IInfiniteChat>>([
    "chat",
    conversation_id,
  ]);

  const lastMessage = chat?.pages?.at(0)?.chat?.at(0);
  if (lastMessage?.sender_id === sender_id) return;

  socket.emit("status", { status: "seen", message_id: lastMessage?.id });
};
