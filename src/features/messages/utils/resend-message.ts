import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";

import { IMessage } from "../types";

import { removeMessageFromQueryData } from "./remove-message-from-query";
import { updateQueryData } from "./update-query-data";

export const resendMessage = ({
  message,
  socket,
  queryClient,
}: {
  message: IMessage;
  socket: Socket;
  queryClient: QueryClient;
}) => {
  const newMessage = {
    ...message,
    status: "sending",
  };

  removeMessageFromQueryData(message.id, message.conversation_id, queryClient);

  updateQueryData(newMessage, message.conversation_id, queryClient);

  socket.emit("message", newMessage);
};
