import { ILike, ITweet } from "../types";

import { CommentButton } from "./actions/comment-button";
import { LikeButton } from "./actions/like-button";
import { RetweetButton } from "./actions/retweet-button";
import { ShareButton } from "./actions/share-button";
import styles from "./styles/tweet-actions.module.scss";

export const TweetActions = ({
  tweet,
  tweetId,
  tweetAuthorId,
  likes,
  showStats = false,
}: {
  tweet: ITweet;
  tweetId: string | undefined;
  tweetAuthorId: string | undefined;
  likes: ILike[] | undefined;
  showStats?: boolean | undefined;
}) => {
  return (
    <div
      className={`${styles.container} ${
        showStats ? styles.tweet : styles.tweetDetails
      }`}
    >
      <CommentButton tweet={tweet} showStats={showStats} />
      <RetweetButton tweet={tweet} />
      <LikeButton
        smallIcons={false}
        showStats={showStats}
        tweetId={tweetId}
        tweetAuthorId={tweetAuthorId}
        likes={likes}
      />
      <ShareButton tweet={tweet} />
    </div>
  );
};
