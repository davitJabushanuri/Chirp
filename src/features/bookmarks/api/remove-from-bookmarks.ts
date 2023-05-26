import axios from "axios";

export const RemoveFromBookmarks = async (bookmarkId: string | undefined) => {
  try {
    const { data } = await axios.delete(`/api/bookmarks?id=${bookmarkId}`);
    return data;
  } catch (error: any) {
    return error.message;
  }
};
