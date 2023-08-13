"use server";

import { prisma } from "@/lib/prisma";

export const getTweetMetadata = async ({ tweet_id }: { tweet_id: string }) => {
  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweet_id,
      },

      select: {
        text: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return tweet;
  } catch (error) {
    console.error(error);
    return null;
  }
};
