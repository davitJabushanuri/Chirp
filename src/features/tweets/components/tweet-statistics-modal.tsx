import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { Button } from "@/components/elements/button";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { Tooltip } from "@/components/elements/tooltip";
import { TryAgain } from "@/components/elements/try-again";
import { PersonDetails } from "@/features/connect";
import { IUser } from "@/features/profile";

import styles from "./styles/tweet-statistics-modal.module.scss";

export const TweetStatisticsModal = ({
  onClose,
  title,
  tweetId,
}: {
  onClose: () => void;
  title: "likes" | "retweets" | null;
  tweetId: string;
}) => {
  const innerWidth = window.innerWidth;

  const {
    data: authors,
    isLoading,
    isError,
  } = useQuery<IUser[]>({
    queryKey: [`tweet`, tweetId, title],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/tweets/statistics?tweet_id=${tweetId}&type=${title}`,
      );
      return data;
    },
    enabled: !!tweetId,
    refetchOnWindowFocus: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.2 }}
      className={styles.container}
    >
      <header>
        <Tooltip text={innerWidth < 700 ? `Close` : `Back`}>
          <Button
            aria-label={innerWidth < 700 ? `Close` : `Back`}
            onClick={() => {
              onClose();
            }}
            className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
          >
            {innerWidth < 700 ? <BackArrowIcon /> : <CloseIcon />}
          </Button>
        </Tooltip>

        <h2 className={styles.title}>
          {title === `likes` ? `Liked By` : `Retweeted By`}
        </h2>
      </header>

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <TryAgain />
      ) : (
        <div className={styles.people}>
          {authors?.map((author: IUser) => {
            return <PersonDetails key={author?.id} author={author} />;
          })}
        </div>
      )}
    </motion.div>
  );
};
