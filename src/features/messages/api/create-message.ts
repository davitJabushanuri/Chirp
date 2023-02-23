import axios from "axios";

import { IMessage } from "../types";

export const createMessage = async ({
  conversationId,
  message,
}: {
  conversationId: string;
  message: IMessage;
}) => {
  try {
    const { data } = await axios.post(`/api/messages/create`, {
      conversationId,
      message,
    });
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
