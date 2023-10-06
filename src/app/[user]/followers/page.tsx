import { Metadata } from "next";

import { UserNotFound } from "@/components/elements/user-not-found";
import { Header, ProfileHeader } from "@/features/header";
import {
  Followers,
  FollowsNavigation,
  getUserMetadata,
} from "@/features/profile";

const page = async ({
  params,
}: {
  params: {
    user: string;
  };
}) => {
  const user = await getUserMetadata({
    user_id: params.user,
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
    <div>
      <Header>
        <ProfileHeader
          heading={user?.name}
          stats={`@${user?.email?.split("@")[0]}`}
        />
      </Header>
      <FollowsNavigation />
      <Followers />
    </div>
  );
};

export default page;

export async function generateMetadata({
  params,
}: {
  params: {
    user: string;
  };
}): Promise<Metadata> {
  const user = await getUserMetadata({
    user_id: params.user,
  });

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `People following ${user?.name?.split(
      " ",
    )[0]} (@${user?.email?.split("@")[0]})`,
    description: user?.description,
  };
}
