"use server";

import { prisma } from "@/lib/prisma";

export const getTweetMetadata = async ({ tweet_id }: { tweet_id: string }) => {
  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweet_id,
      },

      select: {
        id: true,
        text: true,
        author_id: true,
        created_at: true,

        media: true,

        author: {
          select: {
            id: true,
            name: true,
            email: true,
            profile_image_url: true,
          },
        },

        retweets: {
          select: {
            user_id: true,
          },
        },

        likes: {
          select: {
            user_id: true,
          },
        },

        bookmarks: {
          select: {
            id: true,
            user_id: true,
          },
        },

        _count: {
          select: {
            retweets: true,
            quotes: true,
            bookmarks: true,
            likes: true,
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
