"use client";
import { motion } from "framer-motion";
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

  if (!session) return null;

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={styles.replyingTo}
            >
              <ReplyingTo screen_name={in_reply_to_screen_name} />
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CreateTweet
              in_reply_to_screen_name={in_reply_to_screen_name}
              in_reply_to_status_id={in_reply_to_status_id}
              placeholder={`Tweet your reply!`}
              isInspectModal={isInspectModal}
              inputId="tweet-text-comment"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};
