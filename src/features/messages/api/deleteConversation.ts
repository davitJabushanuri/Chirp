import axios from "axios";

export const deleteConversation = async (
  conversationId: string | undefined,
) => {
  try {
    const { data } = await axios.delete(
      `/api/messages/conversations?conversation_id=${conversationId}`,
    );
    return data;
  } catch (error: any) {
    return error.message;
  }
};
