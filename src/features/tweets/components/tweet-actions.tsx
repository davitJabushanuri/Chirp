import { ITweet } from "../types";

import { CommentButton } from "./actions/comment-button";
import { LikeButton } from "./actions/like-button";
import { RetweetButton } from "./actions/retweet-button";
import { ShareButton } from "./actions/share-button";
import styles from "./styles/tweet-actions.module.scss";

export const TweetActions = ({
  tweet,
  showStats = false,
}: {
  tweet: ITweet;
  showStats?: boolean | undefined;
}) => {
  return (
    <div
      aria-label={`${tweet?.comments?.length} replies, ${tweet?.quotes?.length} Retweets, ${tweet?.likes?.length} Likes`}
      role="group"
      className={`${styles.container} ${
        showStats ? styles.tweet : styles.tweetDetails
      }`}
    >
      <CommentButton tweet={tweet} showStats={showStats} />
      <RetweetButton tweet={tweet} showStats={showStats} />
      <LikeButton tweet={tweet} smallIcons={false} showStats={showStats} />
      <ShareButton tweet={tweet} />
    </div>
  );
};
