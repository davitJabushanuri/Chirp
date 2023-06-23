import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id") || undefined;
  const type = searchParams.get("type") || undefined;

  const userIdSchema = z.string().cuid().optional();
  const zod = userIdSchema.safeParse(user_id);

  if (!zod.success) {
    return NextResponse.json(zod.error, { status: 400 });
  }

  try {
    if (type === "followers") {
      const followers = await prisma.user
        .findUnique({
          where: {
            id: user_id,
          },
        })
        .followers();
      return NextResponse.json(followers, { status: 200 });
    } else if (type === "following") {
      const following = await prisma.user
        .findUnique({
          where: {
            id: user_id,
          },
        })
        .following();

      return NextResponse.json(following, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { follower_id, following_id } = await request.json();

  const followerIdSchema = z
    .object({
      follower_id: z.string().cuid(),
      following_id: z.string().cuid(),
    })
    .strict();

  const zod = followerIdSchema.safeParse({ follower_id, following_id });

  if (!zod.success) {
    return NextResponse.json(zod.error, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: {
        id: following_id,
      },

      data: {
        followers: {
          set: {
            id: follower_id,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Followed",
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
