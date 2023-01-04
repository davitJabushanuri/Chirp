/* eslint-disable @next/next/no-img-element */
import { CloseIcon } from "@/assets/close-icon";
import { TweetAuthor } from "@/components/elements/tweet-author";
import { CreateTweet } from "@/features/create-tweet";
import { useDisableBodyScroll } from "@/hooks";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

import { ShowArrowsIcon, HideArrowsIcon } from "../assets/double-arrows-icon";
import { ITweet } from "../types";

import { Comments } from "./comments";
import styles from "./styles/inspect-tweet-image-modal.module.scss";
import { TweetActions } from "./tweet-actions";
import { TweetCreationDate } from "./tweet-creation-date";
import { TweetStatistics } from "./tweet-statistics";

export const InspectTweetImageModal = ({ tweet }: { tweet: ITweet }) => {
  const closeTweetImageModal = useInspectTweetImage(
    (state) => state.closeTweetImageModal,
  );

  const isTweetDetailsOpen = useInspectTweetImage(
    (state) => state.isTweetDetailsOpen,
  );
  const showTweetDetails = useInspectTweetImage(
    (state) => state.showTweetDetails,
  );
  const hideTweetDetails = useInspectTweetImage(
    (state) => state.hideTweetDetails,
  );

  useDisableBodyScroll();

  return (
    <div
      className={`${styles.container} ${
        isTweetDetailsOpen ? styles.hideTweetDetails : styles.showTweetDetails
      }`}
    >
      <div className={styles.images}>
        <button onClick={() => closeTweetImageModal()} className={styles.close}>
          <CloseIcon />
        </button>

        <div className={styles.toggleTweetDetails}>
          {isTweetDetailsOpen ? (
            <button onClick={() => hideTweetDetails()}>
              <HideArrowsIcon />
            </button>
          ) : (
            <button onClick={() => showTweetDetails()}>
              <ShowArrowsIcon />
            </button>
          )}
        </div>

        <div className={styles.imagesContainer}>
          <img src={tweet?.media[2]?.media_url} alt="" />
        </div>
        <div className={styles.tweetActions}>
          <TweetActions
            tweetId={tweet?.id}
            tweetAuthorId={tweet?.author?.id}
            likes={tweet?.likes}
            showStats={true}
          />
        </div>
      </div>
      <div
        className={`${styles.tweetDetails} ${
          isTweetDetailsOpen ? styles.hide : styles.show
        }`}
      >
        <TweetAuthor author={tweet?.author} />
        <div className={styles.tweetText}>{tweet?.text}</div>
        <TweetCreationDate date={tweet?.created_at} />
        <TweetStatistics
          retweet_count={tweet?.retweet_count}
          quote_count={tweet?.quote_count}
          likes={tweet?.likes}
        />
        <TweetActions
          tweetId={tweet?.id}
          tweetAuthorId={tweet?.author?.id}
          likes={tweet?.likes}
        />

        <div className={styles.createComment}>
          <CreateTweet
            in_reply_to_user_screen_name={tweet?.author?.email?.split("@")[0]}
            in_reply_to_status_id={tweet?.id}
            placeholder="Tweet your reply"
          />
        </div>

        <Comments tweetId={tweet?.id} />
      </div>
    </div>
  );
};
