import axios from "axios";

export const unpinTweet = async (id: string | undefined) => {
  try {
    const { data } = await axios.put("/api/tweets/pin", {
      id,
    });
    return data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};
