import { useQuery } from "@tanstack/react-query";

import { getConversation } from "../api/get-conversation";
import { IConversation } from "../types";

export const useGetConversation = (id: string | undefined) => {
  return useQuery<IConversation>({
    queryKey: ["conversations", id],
    queryFn: async () => {
      return getConversation(id);
    },

    refetchOnWindowFocus: false,
  });
};
