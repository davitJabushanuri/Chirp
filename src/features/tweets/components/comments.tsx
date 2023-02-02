import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useComments } from "../hooks/use-comments";

import styles from "./styles/comments.module.scss";
import { Tweet } from "./tweet";

export const Comments = ({ tweetId }: { tweetId: string }) => {
  const { data: comments, isLoading, isError } = useComments(tweetId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      {comments?.map((tweet) => {
        return (
          <div className={styles.tweetContainer} key={tweet?.id}>
            <Tweet tweet={tweet} />
          </div>
        );
      })}
    </div>
  );
};
