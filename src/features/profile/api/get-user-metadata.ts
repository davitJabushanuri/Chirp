"use server";

import { prisma } from "@/lib/prisma";

export const getUserMetadata = async ({ user_id }: { user_id: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },

      include: {
        _count: {
          select: {
            tweets: true,
            likes: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
