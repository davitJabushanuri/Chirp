import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IChosenImages } from "@/features/create-tweet";

import { createMessage } from "../api/create-message";

export const useCreateMessage = ({
  setText,
  setChosenImages,
}: {
  setText: (text: string) => void;
  setChosenImages: (chosenImages: IChosenImages[]) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },

    onError: (error) => {
      console.log("error", error);
    },

    onSettled: () => {
      setText("");
      setChosenImages([]);
    },
  });
};
