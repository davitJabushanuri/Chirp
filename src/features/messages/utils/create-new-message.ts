import { createId } from "@paralleldrive/cuid2";
import React from "react";

import { postImage } from "../api/post-image";
import { IMessageInput, INewMessage } from "../types";

export const createNewMessage = async (
  data: IMessageInput,
  conversation_id: string | undefined,
  sender_id: string | undefined,
  receiver_id: string | undefined,
  setIsUploadingImage: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<INewMessage> => {
  const id = createId();

  const message: INewMessage = {
    id,
    text: null,
    image: null,
    image_width: null,
    image_height: null,
    conversation_id,
    sender_id,
    receiver_id,
    status: "sending",
  };

  message.text = data.text;
  if (data.image?.file) {
    setIsUploadingImage(true);
    const { url } = await postImage(data.image.file, "images");
    message.image = url;
    message.image_width = data.image.width;
    message.image_height = data.image.height;
    setIsUploadingImage(false);
  }

  return message;
};
