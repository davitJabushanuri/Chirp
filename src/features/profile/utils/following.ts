import { IUser } from "../types";

export const following = ({
  user,
  session_owner_id,
}: {
  user: IUser | undefined;
  session_owner_id: string;
}): boolean => {
  return user
    ? user?.followers?.some((follower) => follower.id === session_owner_id)
    : false;
};
