import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id") || undefined;

  const userIdSchema = z.string().cuid();
  const zod = userIdSchema.safeParse(user_id);

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
    const tweets = await prisma.tweet.findMany({
      where: {
        likes: {
          some: {
            user_id,
          },
        },
      },

      include: {
        author: true,
        media: true,
        likes: true,
        retweets: true,
        comments: true,
      },
    });

    return NextResponse.json(tweets, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
      },
      { status: error.errorCode || 500 },
    );
  }
}

export async function POST(request: Request) {
  const { tweet_id, user_id } = (await request.json()) as {
    tweet_id: string;
    user_id: string;
  };

  const likeSchema = z
    .object({
      tweet_id: z.string().cuid(),
      user_id: z.string().cuid(),
    })
    .strict();

  const zod = likeSchema.safeParse({ tweet_id, user_id });

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
        id: tweet_id,
      },
    });

    const like = await prisma.like.findFirst({
      where: {
        tweet_id,
        user_id,
      },
    });

    if (like) {
      await prisma.like.delete({
        where: {
          id: like.id,
        },
      });

      if (tweet && tweet.favorite_count > 0)
        await prisma.tweet.update({
          where: {
            id: tweet_id,
          },

          data: {
            favorite_count: {
              decrement: 1,
            },
          },
        });

      return NextResponse.json({ message: "Tweet unliked" });
    } else {
      await prisma.like.create({
        data: {
          tweet_id,
          user_id,
        },
      });

      if (tweet) {
        await prisma.tweet.update({
          where: {
            id: tweet_id,
          },

          data: {
            favorite_count: {
              increment: 1,
            },
          },
        });
      }

      return NextResponse.json({ message: "Tweet liked" });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
