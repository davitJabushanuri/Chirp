import { Header, ProfileHeader } from "@/features/header";
import { getUserMetadata, IUser, Profile } from "@/features/profile";

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
  });

  return (
    <div>
      <Header>
        <ProfileHeader
          heading={user?.name?.split(" ")[0]}
          stats={`${user?._count?.tweets} Tweets`}
        />
      </Header>
      <Profile initialUser={user as IUser} />
      {children}
    </div>
  );
}
