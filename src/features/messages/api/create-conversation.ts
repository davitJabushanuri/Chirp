import axios from "axios";

export const createConversation = async ({
  senderId,
  receiverId,
}: {
  senderId: string | undefined;
  receiverId: string | null | undefined;
}) => {
  try {
    const { data } = await axios.post(`/api/messages/conversations`, {
      sender_id: senderId,
      receiver_id: receiverId,
    });

    return data?.id;
  } catch (error: any) {
    return error.message;
  }
};
