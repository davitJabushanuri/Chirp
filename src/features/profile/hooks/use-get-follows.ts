import { useQuery } from "@tanstack/react-query";

import { getFollows } from "../api/get-follows";
import { IUser } from "../types";

export const useGetFollows = ({
  id,
  type,
}: {
  id: string | undefined;
  type: string | undefined;
}) => {
  return useQuery<IUser[]>({
    queryKey: ["users", id, type],
    queryFn: async () => {
      return getFollows(id, type);
    },
    refetchOnWindowFocus: false,
  });
};
