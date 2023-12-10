import axios from "axios";

export const getUsers = async (id?: string) => {
  try {
    const { data } = await axios.get(`/api/users${id ? `?id=${id}` : ""}`);

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
