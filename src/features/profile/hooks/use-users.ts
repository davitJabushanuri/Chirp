import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getUsers } from "../api/get-users";
import { IUser } from "../types";

export const useUsers = () => {
  const queryClient = useQueryClient();
  return useQuery<IUser[]>(
    ["users"],
    async () => {
      return getUsers();
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["users"], data);
      },
    },
  );
};
