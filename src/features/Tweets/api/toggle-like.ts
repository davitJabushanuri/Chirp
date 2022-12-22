export const toggleLike = async (tweetId: string, userId: string) => {
  try {
    const response = await fetch("/api/tweets/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tweetId, userId }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error: any) {
    console.error(error);
  }
};
