import axios from "axios";

export const postHashtags = async (hashtags: string[]) => {
  try {
    const { data } = await axios.post(`/api/hashtags`, {
      hashtags,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
