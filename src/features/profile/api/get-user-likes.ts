import axios from "axios";

export const getUserLikes = async (id: string | undefined) => {
  try {
    const { data } = await axios.get(`/api/tweets/likes?user_id=${id}`);
    return data;
  } catch (error: any) {
    return error.message;
  }
};
