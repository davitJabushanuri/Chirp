import axios from "axios";

export const DeleteAllBookmarks = async (id: string | undefined) => {
  try {
    const { data } = await axios.delete(`/api/bookmarks?user_id=${id}`);
    return data;
  } catch (error: any) {
    return error.message;
  }
};
