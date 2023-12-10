import axios from "axios";

export const getHashtags = async () => {
  try {
    const { data } = await axios.get(`/api/hashtags`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
