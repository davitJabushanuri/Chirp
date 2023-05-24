import axios from "axios";

import { postHashtags, retrieveHashtagsFromTweet } from "@/features/explore";

import { postMedia } from "./post-media";

export const postTweet = async ({
  text,
  files,
  userId,
  in_reply_to_screen_name,
  in_reply_to_status_id,
  quoted_tweet_id,
}: {
  text: string;
  files: File[];
  userId: string;
  in_reply_to_screen_name?: string | null;
  in_reply_to_status_id?: string | null;
  quoted_tweet_id?: string | null;
}) => {
  const tweet = {
    text,
    author_id: userId,
    // if no in_reply_to_screen_name, don't send it
    ...(in_reply_to_screen_name && { in_reply_to_screen_name }),
    // if no in_reply_to_status_id, don't send it
    ...(in_reply_to_status_id && { in_reply_to_status_id }),
    // if no quoted_tweet_id, don't send it
    ...(quoted_tweet_id && { quoted_tweet_id }),
  };

  try {
    const { data } = await axios.post(`/api/tweets`, {
      tweet,
    });

    if (files.length > 0) {
      await postMedia({ files, tweetId: data.id, type: `tweet_id` });
    }

    const hashtags = retrieveHashtagsFromTweet(text);
    if (hashtags) await postHashtags(hashtags);

    return data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};
