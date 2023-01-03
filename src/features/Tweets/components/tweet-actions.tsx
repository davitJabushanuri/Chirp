import { ILike } from "../types";

import { CommentButton } from "./actions/comment-button";
import { LikeButton } from "./actions/like-button";
import { RetweetButton } from "./actions/retweet-button";
import { ShareButton } from "./actions/share-button";
import styles from "./styles/tweet-actions.module.scss";

export const TweetActions = ({
  tweetId,
  tweetAuthorId,
  likes,
}: {
  tweetId: string;
  tweetAuthorId: string;
  likes: ILike[];
}) => {
  return (
    <div className={styles.container}>
      <CommentButton />
      <RetweetButton />
      <LikeButton
        smallIcons={false}
        tweetId={tweetId}
        tweetAuthorId={tweetAuthorId}
        likes={likes}
      />
      <ShareButton />
    </div>
  );
};
