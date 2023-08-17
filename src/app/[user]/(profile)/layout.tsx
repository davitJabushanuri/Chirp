import { Header, ProfileHeader } from "@/features/header";
import {
  ProfileNavigation,
  ProfileInfo,
  getUserMetadata,
  IUser,
} from "@/features/profile";

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
      <ProfileInfo initialUser={user as IUser} />
      <ProfileNavigation />
      {children}
    </div>
  );
}
