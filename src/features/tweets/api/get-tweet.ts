import axios from "axios";

export default async function getTweet(id: string | undefined) {
  try {
    const { data } = await axios.get(`/api/tweets/${id}`);
    return data;
  } catch (error: any) {
    console.error(error);
  }
}
