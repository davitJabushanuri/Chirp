import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const cursorQuery = searchParams.get("cursor") || undefined;
  const take = Number(searchParams.get("limit")) || 20;

  const skip = cursorQuery ? 1 : 0;
  const cursor = cursorQuery ? { id: cursorQuery } : undefined;

  try {
    const tweets = await prisma.tweet.findMany({
      skip,
      take,
      cursor,

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
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text");
  const userId = searchParams.get("userId");
  const in_reply_to_screen_name = searchParams.get("in_reply_to_screen_name");
  const in_reply_to_status_id = searchParams.get("in_reply_to_status_id");
  const quoted_tweet_id = searchParams.get("quoted_tweet_id");

  try {
    await prisma.tweet.create({
      data: {
        text,
        userId,
        in_reply_to_screen_name: in_reply_to_screen_name
          ? in_reply_to_screen_name
          : null,
        in_reply_to_status_id: in_reply_to_status_id
          ? in_reply_to_status_id
          : null,
        quoted_tweet_id: quoted_tweet_id ? quoted_tweet_id : null,
      },
    });

    return NextResponse.json({
      message: "Tweet created successfully",
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;

  try {
    const { tweetId } = params;
    await prisma.tweet.delete({
      where: {
        id: tweetId,
      },
    });
    return NextResponse.json({
      message: "Tweet deleted successfully",
    });
  } catch (error) {
    return NextResponse.error();
  }
}
