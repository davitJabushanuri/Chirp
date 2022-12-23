import { useQuery } from "@tanstack/react-query";

import { LoadingSpinner } from "@/components/elements/loading-spinner";

import { getComments } from "../api/get-comments";
import { ITweet } from "../types";

import styles from "./styles/comments.module.scss";
import { Tweet } from "./tweet";

export const Comments = ({ tweetId }: { tweetId: string }) => {
  const {
    data: comments,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ITweet[]>([`comments`], () => getComments(tweetId));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.container}>
      {isSuccess &&
        comments.length &&
        comments?.map((comment) => {
          return <Tweet key={comment?.id} tweet={comment} />;
        })}
    </div>
  );
};
