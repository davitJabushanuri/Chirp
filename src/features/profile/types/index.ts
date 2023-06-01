import { User, Follows, Like } from "@prisma/client";

import { ITweet } from "@/features/tweets";

import { IBookmark } from "./../../tweets/types/index";

export interface IUser extends User {
  tweets: ITweet[];
  followers: IFollow[];
  following: IFollow[];
  likes: ILike[];
  bookmarks: IBookmark[];
  pinned_tweet: ITweet;
  _count?: {
    followers?: number;
    following?: number;
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

export interface IFollow extends Follows {
  follower: IUser;
  following: IUser;
}

export interface ILike extends Like {
  user: IUser;
  tweet: ITweet;
}
