import { Metadata } from "next";

import { Header, ProfileHeader } from "@/features/header";
import { Profile, ProfileTweets, getUserMetadata } from "@/features/profile";

import NotFound from "../not-found";

export async function generateMetadata({
  params,
}: {
  params: {
    user: string;
  };
}): Promise<Metadata> {
  const user = await getUserMetadata({
    user_id: params.user,
    type: "tweets",
  });

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `${user?.name?.split(" ")[0]} (@${user?.email?.split("@")[0]})`,
    description: user?.description,
  };
}

const ProfileTweetsPage = async ({
  params,
}: {
  params: {
    user: string;
  };
}) => {
  const user = await getUserMetadata({
    user_id: params.user,
    type: "tweets",
  });

  if (!user) return <NotFound />;

  return (
    <div>
      <Header>
        <ProfileHeader
          heading={user?.name}
          stats={`${user?._count?.tweets} ${
            user?._count?.tweets === 1 ? "tweet" : "tweets"
          }`}
        />
      </Header>
      <Profile initialUser={user as any} />
      <ProfileTweets />
    </div>
  );
};

export default ProfileTweetsPage;
