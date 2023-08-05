"use server";

import { prisma } from "@/lib/prisma";

export const getTweetMetadata = async ({ tweet_id }: { tweet_id: string }) => {
  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweet_id,
      },
      include: {
        author: true,
        likes: {
          include: {
            user: {
              include: {
                followers: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        },
        media: true,
        retweets: {
          include: {
            user: {
              include: {
                followers: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        },
        quoted_tweet: {
          include: {
            author: true,
            media: true,
          },
        },

        quotes: {
          include: {
            likes: true,
            retweets: true,
            author: true,
            quoted_tweet: {
              include: {
                author: true,
              },
            },
          },

          orderBy: {
            created_at: "desc",
          },
        },
        bookmarks: true,
      },
    });

    return tweet;
  } catch (error) {
    console.error(error);
    return null;
  }
};
