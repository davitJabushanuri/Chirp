import { Message, Conversation } from "@prisma/client";

import { IUser } from "@/features/profile";

export interface IMessage extends Message {
  sender: IUser;
  receiver: IUser;
  conversation: IConversation;
  status: "sending" | "sent" | "seen" | "failed";
  file?: File | null;
}

export interface IConversation extends Conversation {
  users: IUser[];
  messages: IMessage[];
}

export type SocketEmitStatusPayload = {
  status: "sending" | "sent" | "seen" | "failed";
  message_id: string;
};

export type SocketEmitMessagePayload = {
  message: IMessage;
};
