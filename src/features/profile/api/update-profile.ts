import { IProfile } from "./../types/index";
export const updateProfile = async (profile: IProfile, userId: string) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        name: profile?.name,
        bio: profile?.bio,
        location: profile?.location,
        website: profile?.website,
        banner: profile?.banner,
        avatar: profile?.avatar,
      }),
    });
    const updatedProfile = await response.json();
    return updatedProfile;
  } catch (error) {
    console.log(error);
  }
};
