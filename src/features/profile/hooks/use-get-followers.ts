import { useQuery } from "@tanstack/react-query";

import { getFollowers } from "../api/get-followers";
import { IUser } from "../types";

interface IUserFollowers {
  follower: IUser;
}

export const useGetFollowers = (id: string | undefined) => {
  return useQuery<IUserFollowers[]>(
    ["users", id, "followers"],
    async () => {
      return getFollowers(id);
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};
