import { CloseIcon } from "@/assets/close-icon";
import { TweetAuthor } from "@/components/elements/tweet-author";
import { useDisableBodyScroll } from "@/hooks";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

import { ShowArrowsIcon, HideArrowsIcon } from "../assets/double-arrows-icon";
import { ITweet } from "../types";

import styles from "./styles/inspect-tweet-image-modal.module.scss";

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
      </div>
      <div
        className={`${styles.tweetDetails} ${
          isTweetDetailsOpen ? styles.hide : styles.show
        }`}
      >
        <TweetAuthor author={tweet?.author} />
      </div>
    </div>
  );
};
