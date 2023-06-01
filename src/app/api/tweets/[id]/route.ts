import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  const { id } = params;

  const tweetIdSchema = z.string().cuid();

  const zod = tweetIdSchema.safeParse(id);

  if (!zod.success) {
    return NextResponse.json(
      {
        message: "Invalid request body",
        error: zod.error.formErrors,
      },
      { status: 400 },
    );
  }

  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id,
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

    if (!tweet) {
      return NextResponse.json(
        {
          message: "Tweet not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(tweet, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error,
      },
      { status: 500 },
    );
  }
}
