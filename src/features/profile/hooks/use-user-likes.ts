import { useQuery } from "@tanstack/react-query";

import { ILike } from "@/features/tweets";

import { getUserLikes } from "../api/get-user-likes";

export const useUserLikes = (id: string | undefined) => {
  return useQuery<ILike[]>({
    queryKey: ["likes", { userId: id }],
    queryFn: async () => {
      return getUserLikes(id);
    },
    refetchOnWindowFocus: false,
  });
};
