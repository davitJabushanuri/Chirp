import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id") as string;

  const idSchema = z.string().cuid();
  const zod = idSchema.safeParse(user_id);

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
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        user_id,
      },

      orderBy: {
        created_at: "desc",
      },

      select: {
        id: true,
        user_id: true,
        tweet: {
          select: {
            id: true,
            text: true,
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                profile_image_url: true,
              },
            },

            media: true,
            likes: {
              select: {
                user_id: true,
              },
            },
            retweets: {
              select: {
                user_id: true,
              },
            },
            comments: true,
            bookmarks: true,
            quotes: true,
            is_quote_status: true,
          },
        },
      },
    });

    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { tweet_id, user_id } = (await request.json()) as {
    tweet_id: string;
    user_id: string;
  };

  const bookmark = z
    .object({
      tweet_id: z.string().cuid(),
      user_id: z.string().cuid(),
    })
    .strict();

  const zod = bookmark.safeParse({ tweet_id, user_id });

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
    await prisma.bookmark.create({
      data: {
        tweet_id,
        user_id,
      },
    });

    return NextResponse.json({
      message: "Bookmark added",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookmark_id = (searchParams.get("bookmark_id") as string) || undefined;
  const user_id = (searchParams.get("user_id") as string) || undefined;

  const idSchema = z
    .object({
      user_id: z.string().cuid().optional(),
      bookmark_id: z.string().cuid().optional(),
    })
    .strict();

  const zod = idSchema.safeParse({ user_id, bookmark_id });

  if (!zod.success) {
    return NextResponse.json(
      {
        message: "Invalid request body",
        error: zod.error.formErrors,
      },
      { status: 400 },
    );
  }

  if (bookmark_id) {
    try {
      await prisma.bookmark.delete({
        where: {
          id: bookmark_id,
        },
      });
      return NextResponse.json(
        {
          message: "Bookmark removed",
        },
        { status: 200 },
      );
    } catch (error: any) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  } else if (user_id) {
    try {
      await prisma.bookmark.deleteMany({
        where: {
          user_id,
        },
      });
      return Response.json(
        {
          message: "Bookmarks removed",
        },
        { status: 200 },
      );
    } catch (error: any) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
}
