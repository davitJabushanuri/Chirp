import { useSession } from "next-auth/react";
import { useState } from "react";

import { Action, ActionsModal } from "@/components/elements/actions-modal";

import { QuoteTweetIcon } from "../../assets/quote-tweet-icon";
import { RetweetIcon } from "../../assets/retweet-icon";
import { useRetweet } from "../../hooks/useRetweet";
import { ITweet } from "../../types";

import styles from "./styles/actions.module.scss";

export const RetweetButton = ({ tweet }: { tweet: ITweet }) => {
  const { data: session } = useSession();
  const hasRetweeted = tweet?.retweets?.some(
    (retweet) => retweet?.user_id === session?.user?.id,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const retweetMutation = useRetweet(setIsModalOpen);

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <ActionsModal setIsModalOpen={setIsModalOpen}>
          <button
            onClick={() =>
              retweetMutation.mutate({
                tweetId: tweet?.id,
                userId: tweet?.author?.id,
              })
            }
          >
            <Action
              icon={<RetweetIcon />}
              text={hasRetweeted ? `Undo retweet` : `Retweet`}
            />
          </button>

          <button>
            <Action icon={<QuoteTweetIcon />} text={`Quote Tweet`} />
          </button>
        </ActionsModal>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={`${styles.retweet} ${hasRetweeted ? styles.retweeted : ""}`}
      >
        <span className={styles.icon}>
          <RetweetIcon />
        </span>
        {tweet?.retweets.length > 0 && (
          <span className={styles.stats}>{tweet?.retweets?.length}</span>
        )}
      </button>
    </div>
  );
};
