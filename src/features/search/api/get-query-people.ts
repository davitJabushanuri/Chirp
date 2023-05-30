import axios from "axios";

export const getQueryPeople = async (query: string | undefined) => {
  try {
    const { data } = await axios.get(`/api/search/people/${query}`);
    return data;
  } catch (error: any) {
    return error.Message;
  }
};
