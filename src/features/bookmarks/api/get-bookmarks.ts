import axios from "axios";

export const getBookmarks = async (id: string | undefined) => {
  try {
    const { data } = await axios.get(`/api/bookmarks?user_id=${id}`);
    return data;
  } catch (error: any) {
    return error.message;
  }
};
