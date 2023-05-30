import { useQuery } from "@tanstack/react-query";

import { getFollows } from "../api/get-follows";
import { IFollow } from "../types";

export const useGetFollows = ({
  id,
  type,
}: {
  id: string | undefined;
  type: string | undefined;
}) => {
  return useQuery<IFollow[]>(
    ["users", id, type],
    async () => {
      return getFollows(id, type);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
