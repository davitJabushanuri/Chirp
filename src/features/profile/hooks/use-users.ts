import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getUsers } from "../api/get-users";
import { IUser } from "../types";

export const useUsers = ({
  queryKey,
  limit,
}: {
  queryKey: string[];
  limit?: number;
}) => {
  const { data: session } = useSession();

  return useQuery<IUser[]>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey,
    queryFn: async () => {
      return getUsers({ id: session?.user?.id, limit });
    },
  });
};
