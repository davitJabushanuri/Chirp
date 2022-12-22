export default async function getTweet({ id }: { id: string }) {
  try {
    const response = await fetch(`/api/tweets/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
