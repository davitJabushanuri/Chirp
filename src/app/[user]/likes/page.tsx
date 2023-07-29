import { Metadata } from "next";
import { headers } from "next/headers";

import { UserNotFound } from "@/components/elements/user-not-found";
import { Header, ProfileHeader } from "@/features/header";
import { prisma } from "@/lib/prisma";

import { LikesCLientPage } from "./client";

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
            likes: true,
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

const page = async () => {
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
          stats={`${user?._count?.likes} Likes`}
        />
      </Header>
      <LikesCLientPage user={user as any} />
    </>
  );
};

export default page;

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserData();

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
