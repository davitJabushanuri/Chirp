import { IUser } from "@/features/profile";
import { ITweet } from "@/features/tweets";

export interface IBookmark {
  id: string;
  tweet: ITweet;
  tweet_id: string;
  user: IUser;
  user_id: string;
  created_at: string;
}
