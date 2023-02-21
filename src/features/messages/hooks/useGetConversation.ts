import { useQuery } from "@tanstack/react-query";

import { getConversation } from "../api/get-conversation";
import { IConversation } from "../types";

export const useGetConversation = (id: string | undefined) => {
  return useQuery<IConversation>(
    ["conversation", id],
    async () => {
      return getConversation(id);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
