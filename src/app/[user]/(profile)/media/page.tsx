import { Metadata } from "next";

import { ProfileMedia, getUserMetadata } from "@/features/profile";

const MediaPage = async () => {
  return <ProfileMedia />;
};

export default MediaPage;

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
