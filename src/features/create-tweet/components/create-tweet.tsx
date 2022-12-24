import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { LocationIcon } from "@/assets/location-icon";

import { postTweet } from "../api/post-tweet";
import { EmojiIcon } from "../assets/emoji-icon";
import { GifIcon } from "../assets/gif-icon";
import { ImageIcon } from "../assets/image-icon";
import { PollIcon } from "../assets/poll-icon";
import { ScheduleIcon } from "../assets/schedule-icon";

import Action from "./action";
import styles from "./styles/create-tweet.module.scss";
import User from "./user";

export const CreateTweet = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ text, userId }: { text: string; userId: string }) =>
      postTweet({ text, userId }),

    {
      onSuccess: () => {
        setText("");
        queryClient.invalidateQueries(["tweets"]);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const [text, setText] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <User />
      </div>

      <div className={styles.tweet}>
        <div className={styles.text}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
          />
        </div>
        <div className={styles.actions}>
          <div className={styles.media}>
            <Action icon={<ImageIcon />} />
            <Action icon={<GifIcon />} />
            <span className={styles.hide}>
              <Action icon={<PollIcon />} />
            </span>
            <Action icon={<EmojiIcon />} />
            <span className={styles.hide}>
              <Action icon={<ScheduleIcon />} />
            </span>
            <Action icon={<LocationIcon />} />
          </div>
          <div className={styles.tweetButton}>
            <button
              onClick={() =>
                mutation.mutate({ text: text, userId: session?.user?.id })
              }
              disabled={text.length === 0}
              className={styles.button}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
