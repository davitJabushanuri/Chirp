import { Message, Conversation } from "@prisma/client";

import { IUser } from "@/features/profile";
import { IMedia } from "@/features/tweets";

export interface IMessage extends Message {
  media: IMedia[];
  sender: IUser;
  receiver: IUser;
  conversation: IConversation;
}

export interface IConversation extends Conversation {
  users: IUser[];
  messages: IMessage[];
}
