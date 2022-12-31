export const getUserTweets = async (userId: string | undefined) => {
  try {
    const response = await fetch(`/api/users/${userId}/tweets`);
    const userTweets = await response.json();
    return userTweets;
  } catch (error) {
    throw new Error("Failed to get user tweets");
  }
};
