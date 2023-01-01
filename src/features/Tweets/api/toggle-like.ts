export const toggleLike = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  try {
    const response = await fetch("/api/tweets/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tweetId, userId }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("error", error);
    throw new Error("Failed to like tweet");
  }
};
