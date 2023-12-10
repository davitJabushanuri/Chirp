import axios from "axios";

export const getMedia = async (messageId: string | undefined) => {
  try {
    const { data } = await axios.get(
      `/api/messages/media?message_id=${messageId}`,
    );

    return data;
  } catch (error: any) {
    return error.message;
  }
};
