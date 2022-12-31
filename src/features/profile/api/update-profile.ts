import { IProfile } from "./../types/index";
import { postImage } from "./post-image";
export const updateProfile = async (profile: IProfile, userId: string) => {
  if (!profile) return;
  try {
    let bannerUrl: string | undefined;
    let avatarUrl: string | undefined;

    if (profile?.banner?.file) {
      bannerUrl = await postImage(profile?.banner?.file, "banners");
    }

    if (profile?.avatar?.file) {
      avatarUrl = await postImage(profile?.avatar?.file, "avatars");
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
        banner: bannerUrl ? bannerUrl : profile?.banner?.url,
        avatar: avatarUrl ? avatarUrl : profile?.avatar?.url,
      }),
    });
    const updatedProfile = await response.json();
    return updatedProfile;
  } catch (error) {
    throw new Error("Failed to update profile");
  }
};
