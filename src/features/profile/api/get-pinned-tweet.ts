import axios from "axios";

export const getPinnedTweet = async (id: string | undefined) => {
  try {
    const response = await axios.get(`/api/tweets/pin?user_id=${id}`);
    const pinnedTweet = response.data;
    return pinnedTweet;
  } catch (error: any) {
    return error.message;
  }
};
