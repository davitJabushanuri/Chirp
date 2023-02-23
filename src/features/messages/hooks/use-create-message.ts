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
      text: string | null;
      files: File[];
      conversationId: string | undefined;
      senderId: string | undefined;
      receiverId: string | undefined;
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
        queryClient.invalidateQueries(["conversations"]);
      },
    },
  );
};
