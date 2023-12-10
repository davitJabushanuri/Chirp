import axios from "axios";

export const deleteTweet = async (tweetId: string) => {
  try {
    const { data } = await axios.delete(`/api/tweets?id=${tweetId}`);

    return data;
  } catch (error: any) {
    console.log(error);
  }
};
