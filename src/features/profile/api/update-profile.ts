export const updateProfile = async (userId: number) => {
  try {
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    const updatedProfile = await response.json();
    return updatedProfile;
  } catch (error) {
    console.log(error);
  }
};
