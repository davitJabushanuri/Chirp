import { Message, Conversation } from "@prisma/client";

import { IUser } from "@/features/profile";

export type status = "sending" | "sent" | "seen" | "failed";

export interface IMessage extends Message {
  sender: IUser;
  receiver: IUser;
  conversation: IConversation;
  file?: File | null;
}

export interface INewMessage {
  id: string;
  text: string | null;
  image: string | null;
  image_width: number | null;
  image_height: number | null;
  conversation_id: string | undefined;
  sender_id: string | undefined;
  receiver_id: string | undefined;
  status: string;
}

export interface IImage {
  file: File | null;
  width: number | null;
  height: number | null;
  preview: string | ArrayBuffer | null;
}

export interface IMessageInput {
  text: string;
  image: IImage;
}

export interface IConversation extends Conversation {
  users: IUser[];
  messages: IMessage[];
}

export interface IStatusPayload {
  status: status;
  message_id: string;
}

export interface IMessagePayload {
  message: IMessage;
}
