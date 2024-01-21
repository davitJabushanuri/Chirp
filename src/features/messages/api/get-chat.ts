import axios from "axios";

export const getChat = async (conversation_id: string | undefined) => {
  try {
    const { data } = await axios.get(
      `/api/messages/chat?conversation_id=${conversation_id}`,
    );
    return data;
  } catch (error: any) {
    return error.message;
  }
};
