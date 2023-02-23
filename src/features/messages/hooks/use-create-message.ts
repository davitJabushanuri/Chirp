import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMessage } from "../api/create-message";
import { IMessage } from "../types";

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      conversationId,
      message,
    }: {
      conversationId: string;
      message: IMessage;
    }) => {
      return createMessage({
        conversationId,
        message,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["messages"]);
      },
    },
  );
};
