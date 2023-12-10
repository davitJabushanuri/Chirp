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
