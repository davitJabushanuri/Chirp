import { Metadata } from "next";
import { headers } from "next/headers";

import { UserNotFound } from "@/components/elements/user-not-found";
import { Header, ProfileHeader } from "@/features/header";
import { prisma } from "@/lib/prisma";

import { WithRepliesClientPage } from "./client";

const getUserData = async () => {
  const headerList = headers();
  const pathname = headerList.get("x-invoke-path") || "";
  const id = pathname?.split("/")[1] || "";

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },

      include: {
        _count: {
          select: {
            tweets: {
              where: {
                OR: [
                  {
                    in_reply_to_screen_name: {
                      not: null,
                    },
                  },
                  {
                    in_reply_to_status_id: {
                      not: null,
                    },
                  },
                ],
              },
            },
            followers: true,
            following: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const WithRepliesPage = async () => {
  const user = await getUserData();

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

      <WithRepliesClientPage user={user as any} />
    </>
  );
};

export default WithRepliesPage;

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserData();

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
