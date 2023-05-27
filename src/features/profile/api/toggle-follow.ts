import axios from "axios";

export const toggleFollow = async (followerId: string, userId: string) => {
  try {
    const response = await axios.post("/api/users/follow", {
      follower_id: followerId,
      following_id: userId,
    });
    const user = response.data;
    return user;
  } catch (error: any) {
    return error.message;
  }
};
