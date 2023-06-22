"use client";

import { CreateTweet } from "./create-tweet";
import { ReplyingTo } from "./replying-to";
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
  return (
    <div className={styles.container}>
      {in_reply_to_screen_name && (
        <div className={styles.replyingTo}>
          <ReplyingTo screen_name={in_reply_to_screen_name} />
        </div>
      )}
      <CreateTweet
        in_reply_to_screen_name={in_reply_to_screen_name}
        in_reply_to_status_id={in_reply_to_status_id}
        placeholder={`Tweet your reply!`}
        isInspectModal={isInspectModal}
      />
    </div>
  );
};
