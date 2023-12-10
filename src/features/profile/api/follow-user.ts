import axios from "axios";

export const followUser = async (user_id: string, session_owner_id: string) => {
  try {
    const { data } = await axios.put("/api/users/follow", {
      user_id,
      session_owner_id,
    });

    return data;
  } catch (error: any) {
    return error.message;
  }
};
