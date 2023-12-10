import axios from "axios";
export const getTweets = async ({
  pageParam = "",
  limit = 20,
  type,
  id,
}: {
  pageParam?: string | unknown;
  limit?: number;
  type?: string;
  id?: string;
}) => {
  try {
    const { data } = await axios.get(
      `/api/tweets?cursor=${pageParam}&limit=${limit}${
        type ? `&type=${type}` : ""
      }${id ? `&id=${id}` : ""}`,
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
