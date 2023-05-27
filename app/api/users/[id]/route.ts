import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: {
    params: {
      id: string;
    };
  },
) {
  const { id } = context.params;

  const idSchema = z.string().cuid();
  const zod = idSchema.safeParse(id);

  if (!zod.success) {
    return NextResponse.json(zod.error, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
        screen_name: true,
        email: true,
        profile_image_url: true,
        profile_banner_url: true,

        created_at: true,
        description: true,
        location: true,
        url: true,
        verified: true,
        followers: {
          select: {
            follower_id: true,
          },
        },
        following: {
          select: {
            follower_id: true,
          },
        },

        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(request: Request) {}
