export const getComments = async (tweetId: string) => {
  try {
    const response = await fetch(`/api/tweets/${tweetId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
