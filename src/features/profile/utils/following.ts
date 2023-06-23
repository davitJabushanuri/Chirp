import { IUser } from "../types";

export const following = ({
  user,
  session_owner_id,
}: {
  user: IUser;
  session_owner_id: string;
}): boolean => {
  return user?.followers?.some((follower) => follower.id === session_owner_id);
};
