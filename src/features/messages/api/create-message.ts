import axios from "axios";

import { postMedia } from "@/features/create-tweet";

export const createMessage = async ({
  text,
  files,
  conversationId,
  senderId,
  receiverId,
}: {
  text: string | null;
  files: File[];
  conversationId: string | undefined;
  senderId: string | undefined;
  receiverId: string | undefined;
}) => {
  try {
    const { data } = await axios.post(`/api/messages/create`, {
      text,
      conversationId,
      senderId,
      receiverId,
    });

    console.log(data);

    if (files.length > 0) {
      await postMedia({ files, messageId: data.id, type: `message_id` });
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