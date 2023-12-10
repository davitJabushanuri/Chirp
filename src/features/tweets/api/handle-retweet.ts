import axios from "axios";

export const handleRetweet = async (tweetId: string, userId: string) => {
  try {
    const { data } = await axios.post(`/api/tweets/retweets`, {
      tweet_id: tweetId,
      user_id: userId,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
