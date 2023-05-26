import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { tweet_id, user_id } = await request.json();

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
    await prisma.bookmark.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      message: "Bookmark removed",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
