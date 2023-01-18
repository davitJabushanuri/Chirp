import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getUser } from "../api/get-user";
import { IUser } from "../types";

export const useUser = (id: string | undefined) => {
  const queryClient = useQueryClient();
  return useQuery<IUser>(
    ["users", id],
    async () => {
      return getUser(id);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["users", id], data);
      },
    },
  );
};
