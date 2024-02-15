import axios from "axios";

export const getUsers = async ({
  id,
  limit,
}: {
  id?: string;
  limit?: number;
}) => {
  try {
    const { data } = await axios.get(
      `/api/users${id ? `?id=${id}` : ""}&${limit ? `&limit=${limit}` : ""}}`,
    );

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
