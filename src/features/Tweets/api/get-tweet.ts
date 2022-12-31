export default async function getTweet({ id }: { id: string }) {
  const response = await fetch(`/api/tweets/${id}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}
