import type { Tweet, Like, Media, Retweet, Bookmark } from "@prisma/client";

import { IUser } from "@/features/profile";

export interface IFeed {
  id: number;
}

export interface ITweet extends Tweet {
  author: IUser;
  likes: ILike[];
  media: IMedia[];
  retweets: IRetweet[];
  quoted_tweet: ITweet;
  quotes: ITweet[];
  comments: ITweet[];
  bookmarks: IBookmark[];
  pinned_by_users: IUser[];
  _count: {
    retweets: number;
    quotes: number;
    likes: number;
    bookmarks: number;
    comments: number;
  };
}

export interface ILike extends Like {
  user: IUser;
  tweet: ITweet;
}

export interface IMedia extends Media {
  tweet: ITweet;
}

export interface IRetweet extends Retweet {
  user: IUser;
}

export interface IBookmark extends Bookmark {
  user: IUser;
  tweet: ITweet;
}

export interface IInfiniteTweets {
  pages: { tweets: ITweet[]; nextId?: string | undefined }[];
  pageParams: any;
}
