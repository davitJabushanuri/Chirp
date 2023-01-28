import { useState } from "react";

import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { CreateTweet } from "./create-tweet";
import styles from "./styles/create-tweet-wrapper.module.scss";

export const CreateTweetWrapper = () => {
  const in_reply_to_screen_name = useCreateTweetModal(
    (state) => state.in_reply_to_screen_name,
  );
  const in_reply_to_status_id = useCreateTweetModal(
    (state) => state.in_reply_to_status_id,
  );

  const setScreenName = useCreateTweetModal((state) => state.setScreenName);
  const setStatusId = useCreateTweetModal((state) => state.setStatusId);

  const [isComment, setIsComment] = useState(true);

  return (
    <div className={styles.container}>
      <CreateTweet
        in_reply_to_screen_name={in_reply_to_screen_name}
        in_reply_to_status_id={in_reply_to_status_id}
        placeholder={`Tweet your reply`}
        isComment={isComment}
      />
      {isComment && (
        <button
          onClick={() => {
            setScreenName(null);
            setStatusId(null);
            setIsComment(false);
          }}
          className={styles.commentButton}
        ></button>
      )}
    </div>
  );
};
