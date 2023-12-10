import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id") || undefined;

  const userSchema = z.string().nonempty();
  const zod = userSchema.safeParse(user_id);

  if (!zod.success) {
    return NextResponse.json({ error: zod.error }, { status: 400 });
  }

  try {
    const user = await prisma.user
      .findUnique({
        where: {
          id: user_id,
        },
      })
      .pinned_tweet({
        include: {
          author: true,
          media: true,
          likes: true,
          retweets: true,
          comments: true,
        },
      });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { tweet_id, user_id } = (await request.json()) as {
    tweet_id: string;
    user_id: string;
  };

  const userSchema = z
    .object({
      tweet_id: z.string(),
      user_id: z.string(),
    })
    .strict();

  const zod = userSchema.safeParse({ tweet_id, user_id });

  if (!zod.success) {
    return NextResponse.json({ error: zod.error }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: {
        id: user_id,
      },

      data: {
        pinned_tweet_id: tweet_id,
      },
    });

    return NextResponse.json({ message: "Tweet pinned" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id } = (await request.json()) as { id: string };

  const userSchema = z.string();

  const zod = userSchema.safeParse(id);

  if (!zod.success) {
    return NextResponse.json({ error: zod.error }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },

      data: {
        pinned_tweet_id: null,
      },
    });

    return NextResponse.json(
      { message: "Tweet unpinned", user },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
