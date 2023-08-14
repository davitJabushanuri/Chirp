import { Metadata } from "next";

import { ProfileLikes, getUserMetadata } from "@/features/profile";

const page = async () => {
  return <ProfileLikes />;
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
