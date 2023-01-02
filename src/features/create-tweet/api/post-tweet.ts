import axios from "axios";

import { postMedia } from "./post-media";

export const postTweet = async ({
  text,
  userId,
  files,
  in_reply_to_user_screen_name,
  in_reply_to_status_id,
}: {
  text: string;
  userId: string;
  files: File[];
  in_reply_to_user_screen_name?: string | null;
  in_reply_to_status_id?: string | null;
}) => {
  // try {
  //   const response = await fetch("/api/tweets/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       text,
  //       userId,
  //     }),
  //   });
  //   const data = await response.json();

  //   if (files.length > 0) {
  //     await postMedia({ files, tweetId: data.id });
  //     // delay to allow for media to be uploaded
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //   }

  //   return data;
  // } catch (error) {
  //   console.log("error", error);
  //   throw new Error("Failed to create tweet");
  // }

  try {
    const { data } = await axios.post(`/api/tweets/create`, {
      text,
      userId,
      in_reply_to_user_screen_name: in_reply_to_user_screen_name
        ? in_reply_to_user_screen_name
        : null,
      in_reply_to_status_id: in_reply_to_status_id
        ? in_reply_to_status_id
        : null,
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
