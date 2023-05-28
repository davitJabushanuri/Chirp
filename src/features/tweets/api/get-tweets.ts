import axios from "axios";
export const getTweets = async ({
  pageParam = "",
  limit = 20,
  type,
  id,
  condition,
}: {
  pageParam?: string;
  limit?: number;
  type?: string;
  id?: string;
  condition?: string;
}) => {
  try {
    const { data } = await axios.get(
      `/api/tweets?cursor=${pageParam}&limit=${limit}${
        type ? `&type=${type}` : ""
      }${id ? `&id=${id}` : ""}${condition ? `&condition=${condition}` : ""}`,
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
