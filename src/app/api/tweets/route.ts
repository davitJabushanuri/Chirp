import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type") || undefined;
  const id = searchParams.get("id") || undefined;

  const cursorQuery = searchParams.get("cursor") || undefined;
  const take = Number(searchParams.get("limit")) || 20;

  const skip = cursorQuery ? 1 : 0;
  const cursor = cursorQuery ? { id: cursorQuery } : undefined;

  try {
    const tweets = await prisma.tweet.findMany({
      skip,
      take,
      cursor,

      where: {
        ...(type === "comments" && {
          in_reply_to_status_id: id,
        }),

        ...(type === "bookmarks" && {
          bookmarks: {
            some: {
              user_id: id,
            },
          },
        }),

        ...(type === "search" && {
          text: {
            contains: id,
            mode: "insensitive",
          },
        }),

        ...(type === "user_tweets" && {
          author_id: id,
        }),

        ...(type === "user_replies" && {
          author_id: id,
          NOT: {
            in_reply_to_status_id: null,
            in_reply_to_screen_name: null,
            in_reply_to_user_id: null,
          },
        }),

        ...(type === "user_media" && {
          author_id: id,
          media: {
            some: {},
          },
        }),

        ...(type === "user_likes" && {
          likes: {
            some: {
              user_id: id,
            },
          },
        }),
      },

      include: {
        author: {
          include: {
            bookmarks: true,
          },
        },

        likes: true,
        media: true,
        retweets: true,

        quoted_tweet: {
          include: {
            author: true,
            media: true,
          },
        },

        quotes: true,
        comments: true,

        bookmarks: {
          include: {
            user: true,
          },
          orderBy: {
            created_at: "desc",
          },
        },

        _count: {
          select: {
            comments: true,
            likes: true,
            quotes: true,
            retweets: true,
          },
        },
      },

      orderBy: {
        created_at: "desc",
      },
    });

    const nextId =
      tweets.length < take ? undefined : tweets[tweets.length - 1].id;

    return NextResponse.json({
      tweets,
      nextId,
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  const { tweet } = (await request.json()) as {
    tweet: {
      text: string;
      author_id: string;
      in_reply_to_screen_name?: string;
      in_reply_to_status_id?: string;
      quoted_tweet_id?: string;
    };
  };

  tweet.text = encodeURIComponent(tweet?.text);

  const tweetSchema = z
    .object({
      text: z.string(),
      author_id: z.string().cuid(),
      in_reply_to_screen_name: z.string().optional(),
      in_reply_to_status_id: z.string().cuid().optional(),
      quoted_tweet_id: z.string().cuid().optional(),
    })
    .strict();

  const zod = tweetSchema.safeParse(tweet);

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
    const created_tweet = await prisma.tweet.create({
      data: {
        ...tweet,
      },
    });

    if (tweet.quoted_tweet_id) {
      await prisma.tweet.update({
        where: {
          id: tweet.quoted_tweet_id,
        },

        data: {
          quote_count: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json(created_tweet, { status: 200 });
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

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") as string;

  const idSchema = z.string().cuid();
  const zod = idSchema.safeParse(id);

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
    await prisma.tweet.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      message: "Tweet deleted successfully",
    });
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
