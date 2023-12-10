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
    const { data } = await axios.post(`/api/messages`, {
      text,
      conversation_id: conversationId,
      sender_id: senderId,
      receiver_id: receiverId,
    });

    if (files.length > 0) {
      await postMedia({ files, message_id: data.id });
    }

    return data;
  } catch (error: any) {
    return error.message;
  }
};
