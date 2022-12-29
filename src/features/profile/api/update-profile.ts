import { IProfile } from "./../types/index";
import { postImage } from "./post-image";
export const updateProfile = async (profile: IProfile, userId: string) => {
  if (!profile) return;
  try {
    let bannerUrl = "" as string | undefined;
    let avatarUrl = "" as string | undefined;

    if (profile?.banner?.file) {
      bannerUrl = await postImage(profile?.banner?.file);
    }

    if (profile?.avatar?.file) {
      avatarUrl = await postImage(profile?.avatar?.file);
    }

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
        banner: bannerUrl,
        avatar: avatarUrl,
      }),
    });
    const updatedProfile = await response.json();
    return updatedProfile;
  } catch (error) {
    console.log(error);
  }
};
