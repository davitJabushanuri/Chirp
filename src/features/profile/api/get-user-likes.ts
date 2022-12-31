export const getUserLikes = async (userId: string | undefined) => {
  try {
    const response = await fetch(`/api/users/${userId}/likes`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("failed to get user likes");
  }
};
