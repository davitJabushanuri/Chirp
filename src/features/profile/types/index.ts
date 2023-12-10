import { User, Like } from "@prisma/client";

import { ITweet } from "@/features/tweets";
import { IBookmark } from "@/features/tweets";

export interface IUser extends User {
  tweets: ITweet[];
  followers: User[];
  following: User[];
  likes: ILike[];
  bookmarks: IBookmark[];
  pinned_tweet: ITweet;
  _count?: {
    followers?: number;
    following?: number;
    tweets?: number;
    likes?: number;
  };
}

export interface IProfile {
  name: string;
  bio: string | undefined;
  location: string | undefined;
  website: string | undefined;
  banner: {
    url: string | undefined;
    file: File | undefined;
  };
  avatar: {
    url: string | undefined;
    file: File | undefined;
  };
}

export interface ILike extends Like {
  user: IUser;
  tweet: ITweet;
}
