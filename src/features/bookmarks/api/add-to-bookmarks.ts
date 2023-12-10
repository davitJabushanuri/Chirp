import axios from "axios";

export const AddToBookmarks = async ({
  tweetId,
  userId,
}: {
  tweetId: string | undefined;
  userId: string | undefined;
}) => {
  try {
    const { data } = await axios.post(`/api/bookmarks`, {
      tweet_id: tweetId,
      user_id: userId,
    });
    return data;
  } catch (error: any) {
    return error.message;
  }
};
