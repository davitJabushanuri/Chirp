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

export async function POST(request: Request) {
  const { sender_id, receiver_id } = (await request.json()) as {
    sender_id: string;
    receiver_id: string;
  };

  const conversationSchema = z
    .object({
      sender_id: z.string().cuid(),
      receiver_id: z.string().cuid(),
    })
    .strict();

  const zod = conversationSchema.safeParse({
    sender_id,
    receiver_id,
  });

  if (!zod.success) {
    return NextResponse.json(zod.error.formErrors, { status: 400 });
  }

  try {
    const conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            id: `${sender_id}-${receiver_id}`,
          },
          {
            id: `${receiver_id}-${sender_id}`,
          },
        ],
      },
    });

    if (conversation) {
      return NextResponse.json(conversation, { status: 200 });
    } else {
      const newConversation = await prisma.conversation.create({
        data: {
          id: `${sender_id}-${receiver_id}`,
          users: {
            connect: [
              {
                id: sender_id,
              },
              {
                id: receiver_id,
              },
            ],
          },
        },
      });

      return NextResponse.json(newConversation, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversation_id = searchParams.get("conversation_id") as string;

  const conversationIdSchema = z.string();
  const zod = conversationIdSchema.safeParse(conversation_id);

  if (!zod.success) {
    return NextResponse.json(zod.error.formErrors, { status: 400 });
  }

  try {
    await prisma.conversation.delete({
      where: {
        id: conversation_id,
      },
    });

    return NextResponse.json(
      {
        message: "Conversation deleted successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
