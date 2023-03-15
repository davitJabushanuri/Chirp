import { useQuery } from "@tanstack/react-query";

import { getFollowing } from "../api/get-following";
import { IUser } from "../types";

interface IUserFollowing {
  follower: IUser;
}

export const useGetFollowing = (id: string | undefined) => {
  return useQuery<IUserFollowing[]>(
    ["users", id, "following"],
    async () => {
      return getFollowing(id);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
