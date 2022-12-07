export interface IFeed {
  id: number;
}

export interface ITweet {
  id: number;
  text?: string;
  image?: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  coordinates?: string;
  favorite_count: number;
  in_reply_to_screen_name?: number;
  in_reply_to_status_id?: number;
  in_reply_to_user_id?: number;
  is_quote_status: boolean;
  lang?: string;
  place_id?: string;
  possibly_sensitive?: boolean;
  quote_count?: number;
  quoted_status_id?: number;
  reply_count?: number;
  retweet_count?: number;
  source?: string;
}
