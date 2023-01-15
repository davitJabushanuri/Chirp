import axios from "axios";

import { postMedia } from "./post-media";

export const postTweet = async ({
  text,
  userId,
  files,
  in_reply_to_screen_name,
  in_reply_to_status_id,
  quoted_tweet_id,
}: {
  text: string;
  userId: string;
  files: File[];
  in_reply_to_screen_name?: string | null;
  in_reply_to_status_id?: string | null;
  quoted_tweet_id?: string | null;
}) => {
  try {
    const { data } = await axios.post(`/api/tweets/create`, {
      text,
      userId,
      in_reply_to_screen_name,
      in_reply_to_status_id,
      quoted_tweet_id,
    });

    if (files.length > 0) {
      await postMedia({ files, tweetId: data.id });
    }

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
