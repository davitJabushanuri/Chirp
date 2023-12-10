import axios from "axios";

export const unfollowUser = async (
  user_id: string,
  session_owner_id: string,
) => {
  try {
    const { data } = await axios.delete(
      `/api/users/follow?user_id=${user_id}&session_owner_id=${session_owner_id}`,
    );
    return data;
  } catch (error: any) {
    return error.message;
  }
};
