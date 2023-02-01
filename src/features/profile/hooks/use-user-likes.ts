import { useQuery } from "@tanstack/react-query";

import { ILike } from "@/features/tweets";

import { getUserLikes } from "../api/get-user-likes";

export const useUserLikes = (id: string | undefined) => {
  return useQuery<ILike[]>(
    ["likes", { userId: id }],
    async () => {
      return getUserLikes(id);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
