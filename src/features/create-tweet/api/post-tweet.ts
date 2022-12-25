export const postTweet = async ({
  text,
  userId,
}: {
  text: string;
  userId: string;
}) => {
  const response = await fetch("/api/tweets/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      userId,
    }),
  });
  const data = await response.json();
  return data;
};
