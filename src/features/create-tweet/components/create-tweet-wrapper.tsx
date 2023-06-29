"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { CreateTweet } from "./create-tweet";
import { CreateTweetPlaceholder } from "./create-tweet-placeholder";
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
  const { data: session } = useSession();

  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true);

  return (
    <div className={styles.container}>
      {isPlaceholder ? (
        <CreateTweetPlaceholder
          image={session?.user?.profile_image_url}
          setIsPlaceholder={setIsPlaceholder}
        />
      ) : (
        <div
          className={`${styles.createTweet} ${
            isPlaceholder ? "" : styles.show
          }`}
        >
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
      )}
    </div>
  );
};
