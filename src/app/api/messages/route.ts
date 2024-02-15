import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversation_id = searchParams.get("conversation_id") as string;

  const messageSchema = z.string();
  const zod = messageSchema.safeParse(conversation_id);

  if (!zod.success) {
    return NextResponse.json({ error: zod.error.formErrors }, { status: 400 });
  }

  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversation_id,
      },

      include: {
        users: {
          include: {
            followers: true,
            following: true,
          },
        },
      },
    });

    return NextResponse.json(conversation, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const message = (await request.json()) as {
    text: string;
    conversation_id: string;
    sender_id: string;
    receiver_id: string;
  };

  const messageSchema = z.object({
    text: z.string(),
    conversation_id: z.string(),
    sender_id: z.string().cuid(),
    receiver_id: z.string().cuid(),
  });
  const zod = messageSchema.safeParse(message);

  if (!zod.success) {
    return NextResponse.json({ error: zod.error.formErrors }, { status: 400 });
  }

  try {
    await prisma.message.create({
      data: {
        ...message,
      },
    });
    return NextResponse.json(
      {
        message: "Message created successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
