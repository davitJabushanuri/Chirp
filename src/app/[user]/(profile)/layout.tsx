import { Metadata } from "next";

import { Header, ProfileHeader } from "@/features/header";
import { Profile, getUserMetadata } from "@/features/profile";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    user: string;
  };
}) {
  const user = await getUserMetadata({
    user_id: params.user,
    type: "tweets",
  });

  return (
    <div>
      <Header>
        <ProfileHeader
          heading={user?.name?.split(" ")[0]}
          stats={`${user?._count?.tweets} Tweets`}
        />
      </Header>
      <Profile user={user as any} />
      {children}
    </div>
  );
}

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
