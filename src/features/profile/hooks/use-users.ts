import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getUsers } from "../api/get-users";
import { IUser } from "../types";

export const useUsers = () => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  return useQuery<IUser[]>(
    ["users"],
    async () => {
      return getUsers(session?.user?.id);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData(["users"], data);
      },
    },
  );
};
