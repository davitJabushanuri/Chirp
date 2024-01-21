import { useQuery } from "@tanstack/react-query";

import { getChat } from "../api/get-chat";
import { IMessage } from "../types";

export const useChat = (conversation_id: string | undefined) => {
  return useQuery<IMessage[]>({
    queryKey: ["chat", conversation_id],
    queryFn: async () => {
      return getChat(conversation_id);
    },
  });
};
