import axios from "axios";
export const toggleLike = async ({
  tweetId,
  userId,
}: {
  tweetId: string | undefined;
  userId: string | undefined;
}) => {
  try {
    const response = await axios.post("/api/tweets/likes", {
      tweet_id: tweetId,
      user_id: userId,
    });
    const data = response.data;
    return data;
  } catch (error: any) {
    return error.message;
  }
};
