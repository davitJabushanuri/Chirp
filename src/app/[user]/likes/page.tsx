import { Metadata } from "next";

import { Header, ProfileHeader } from "@/features/header";
import { Profile, ProfileLikes, getUserMetadata } from "@/features/profile";

export async function generateMetadata({
  params,
}: {
  params: {
    user: string;
  };
}): Promise<Metadata> {
  const user = await getUserMetadata({
    user_id: params.user,
    type: "likes",
  });

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `Tweets liked by ${user?.name?.split(" ")[0]} (@${user?.email?.split(
      "@",
    )[0]})`,
    description: user?.description,
  };
}

const ProfileLikesPage = async ({
  params,
}: {
  params: {
    user: string;
  };
}) => {
  const user = await getUserMetadata({
    user_id: params.user,
    type: "likes",
  });

  return (
    <div>
      <Header>
        <ProfileHeader
          heading={user?.name}
          stats={`${user?._count?.likes} ${
            user?._count?.likes === 1 ? "like" : "likes"
          }`}
        />
      </Header>
      <Profile initialUser={user as any} />
      <ProfileLikes />
    </div>
  );
};

export default ProfileLikesPage;
