import axios from "axios";

export const pinTweet = async (
  tweetId: string | undefined,
  userId: string | undefined,
) => {
  try {
    const { data } = await axios.post("/api/tweets/pin", {
      tweet_id: tweetId,
      user_id: userId,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
