import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMessage } from "../api/create-message";

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      text,
      files,
      conversationId,
      senderId,
      receiverId,
    }: {
      text: string;
      files: File[];
      conversationId: string;
      senderId: string;
      receiverId: string;
    }) => {
      return createMessage({
        text,
        files,
        conversationId,
        senderId,
        receiverId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["messages"]);
      },
    },
  );
};
