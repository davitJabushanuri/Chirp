import axios from "axios";

export const getChat = async ({
  conversation_id,
  pageParam,
  limit,
}: {
  conversation_id: string | undefined;
  pageParam: string | unknown;
  limit: number;
}) => {
  try {
    const { data } = await axios.get(
      `/api/messages/chat?conversation_id=${conversation_id}&cursor=${pageParam}&limit=${limit}`,
    );
    return data;
  } catch (error: any) {
    return error.message;
  }
};
