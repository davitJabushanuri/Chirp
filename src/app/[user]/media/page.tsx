import { Metadata } from "next";

import { Header, ProfileHeader } from "@/features/header";
import { Profile, ProfileMedia, getUserMetadata } from "@/features/profile";

export async function generateMetadata({
  params,
}: {
  params: {
    user: string;
  };
}): Promise<Metadata> {
  const user = await getUserMetadata({
    user_id: params.user,
    type: "media",
  });

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `Media Tweets by ${user?.name?.split(" ")[0]} (@${user?.email?.split(
      "@",
    )[0]})`,
    description: user?.description,
  };
}

const ProfileMediaPage = async ({
  params,
}: {
  params: {
    user: string;
  };
}) => {
  const user = await getUserMetadata({
    user_id: params.user,
    type: "media",
  });

  return (
    <div>
      <Header>
        <ProfileHeader
          heading={user?.name}
          stats={`${user?._count?.tweets} ${
            user?._count?.tweets === 1 ? "Photo & video" : "Photos & videos"
          }`}
        />
      </Header>
      <Profile initialUser={user as any} />
      <ProfileMedia />
    </div>
  );
};

export default ProfileMediaPage;
