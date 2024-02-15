"use client";
import { motion } from "framer-motion";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { CreateTweet } from "./create-tweet";
import { CreateTweetComment } from "./create-tweet-comment";
import styles from "./styles/create-tweet-modal.module.scss";

export const CreateTweetModal = () => {
  const data = useCreateTweetModal((state) => state.data);
  const closeModal = useCreateTweetModal((state) => state.closeModal);

  const innerWidth = window.innerWidth;

  return (
    <motion.div
      initial={{ opacity: 0, y: 200, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 200, scale: 0.8 }}
      transition={{
        ease: "easeOut",
        duration: 0.2,
      }}
      className={styles.container}
    >
      <div className={styles.wrapper}>
        <div className={styles.closeButtonContainer}>
          <Tooltip text={innerWidth < 700 ? "Back" : "Close"}>
            <Button
              aria-label={innerWidth < 700 ? "Back" : "Close"}
              onClick={() => closeModal()}
              className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
            >
              {innerWidth < 700 ? <BackArrowIcon /> : <CloseIcon />}
            </Button>
          </Tooltip>
        </div>
        {data.parent_tweet && <CreateTweetComment tweet={data.parent_tweet} />}

        <CreateTweet
          quoted_tweet={data.quoted_tweet}
          in_reply_to_screen_name={data.in_reply_to_screen_name}
          in_reply_to_status_id={data.in_reply_to_status_id}
          placeholder={data.placeholder}
          container="modal"
          inputId="tweet-text-modal"
        />
      </div>
    </motion.div>
  );
};
