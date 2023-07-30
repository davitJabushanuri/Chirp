import { Metadata } from "next";

import { UserNotFound } from "@/components/elements/user-not-found";
import { Header, ProfileHeader } from "@/features/header";
import { Profile, ProfileTweets, getUserMetadata } from "@/features/profile";

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

const ProfilePage = async ({
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

  if (!user)
    return (
      <>
        <Header>
          <ProfileHeader heading="Profile" stats="" />
        </Header>
        <UserNotFound />
      </>
    );

  return (
    <>
      <Header>
        <ProfileHeader
          heading={user?.name?.split(" ")[0]}
          stats={`${user?._count?.tweets} Tweets`}
        />
      </Header>
      <Profile user={user as any} />
      <ProfileTweets />
    </>
  );
};

export default ProfilePage;
