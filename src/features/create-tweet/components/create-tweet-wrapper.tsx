"use client";

import { useState } from "react";

import { CreateTweet } from "./create-tweet";
import styles from "./styles/create-tweet-wrapper.module.scss";

export const CreateTweetWrapper = ({
  in_reply_to_screen_name,
  in_reply_to_status_id,
  isInspectModal = false,
}: {
  in_reply_to_screen_name: string | undefined;
  in_reply_to_status_id: string | null;
  isInspectModal?: boolean;
}) => {
  const [isComment, setIsComment] = useState(true);

  return (
    <div className={styles.container}>
      <CreateTweet
        in_reply_to_screen_name={in_reply_to_screen_name}
        in_reply_to_status_id={in_reply_to_status_id}
        placeholder={`Tweet your reply`}
        isComment={isComment}
        isInspectModal={isInspectModal}
      />
      {isComment && (
        <button
          onClick={() => {
            setIsComment(false);
          }}
          className={styles.commentButton}
        ></button>
      )}
    </div>
  );
};
