import { IUser } from "@/features/profile";

export interface IMessage {
  id: string;
  text: string;
  image: string;
  created_at: string;
  sender: IUser;
  sender_id: string;
  receiver: IUser;
  receiver_id: string;
  conversation: IConversation;
  conversation_id: string;
}

export interface IConversation {
  id: string;
  sender_id: string;
  receiver_id: string;
  users: IUser[];
  messages: IMessage[];
  created_at: Date;
}
