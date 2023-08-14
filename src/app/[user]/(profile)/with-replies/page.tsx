import { Metadata } from "next";

import { ProfileTweetsAndReplies, getUserMetadata } from "@/features/profile";

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
    title: `Tweets with replies by ${user?.name?.split(
      " ",
    )[0]} (@${user?.email?.split("@")[0]})`,
    description: user?.description,
  };
}

const WithRepliesPage = async () => {
  return <ProfileTweetsAndReplies />;
};

export default WithRepliesPage;
