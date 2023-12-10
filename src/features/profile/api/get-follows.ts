import axios from "axios";

export const getFollows = async (
  id: string | undefined,
  type: string | undefined,
) => {
  try {
    const { data } = await axios.get(
      `/api/users/follow?type=${type}&user_id=${id}`,
    );
    return data;
  } catch (error: any) {
    return error.message;
  }
};
