import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteConversation } from "../api/deleteConversation";

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      conversationId,
    }: {
      conversationId: string | undefined;
    }) => {
      return deleteConversation(conversationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },

    onError: (error) => {
      console.log("error", error);
    },

    onSettled: () => {
      router.push("/messages");
    },
  });
};
