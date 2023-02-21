import { useQuery } from "@tanstack/react-query";

import { getConversations } from "../api/get-conversations";
import { IConversation } from "../types";

export const useGetConversations = (userId: string | undefined) => {
  return useQuery<IConversation[]>(
    ["conversations", userId],
    async () => {
      return getConversations(userId);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
