import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id") as string;

  const userIdSchema = z.string().cuid();
  const zod = userIdSchema.safeParse(user_id);

  if (!zod.success) {
    return NextResponse.json(zod.error.formErrors, { status: 400 });
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: user_id,
          },
        },
      },
      include: {
        messages: {
          include: {
            sender: true,
            receiver: true,
            media: true,
          },
        },

        users: {
          include: {
            followers: true,
          },
        },
      },
    });

    return NextResponse.json(conversations, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
