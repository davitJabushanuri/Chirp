import axios from "axios";

export const getConversation = async (id: string | undefined) => {
  try {
    const { data } = await axios.get(`/api/messages?conversation_id=${id}`);
    return data;
  } catch (error: any) {
    return error.message;
  }
};
