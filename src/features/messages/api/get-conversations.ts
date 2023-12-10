import axios from "axios";

export const getConversations = async (id: string | undefined) => {
  try {
    const { data } = await axios.get(
      `/api/messages/conversations?user_id=${id}`,
    );
    return data;
  } catch (error: any) {
    return error.message;
  }
};
