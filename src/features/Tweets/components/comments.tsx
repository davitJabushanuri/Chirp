import { LoadingSpinner } from "@/components/elements/loading-spinner";

import { useComments } from "../hooks/useComments";

import styles from "./styles/comments.module.scss";
import { Tweet } from "./tweet";

export const Comments = ({ tweetId }: { tweetId: string | undefined }) => {
  const {
    data: comments,
    isLoading,
    isError,
    isSuccess,
  } = useComments(tweetId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.container}>
      {isSuccess &&
        comments?.length > 0 &&
        comments?.map((comment) => {
          return <Tweet key={comment?.id} tweet={comment} />;
        })}
    </div>
  );
};
