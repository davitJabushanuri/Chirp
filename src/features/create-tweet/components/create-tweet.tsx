import { LocationIcon } from "@/assets/location-icon";

import { EmojiIcon } from "../assets/emoji-icon";
import { GifIcon } from "../assets/gif-icon";
import { ImageIcon } from "../assets/image-icon";
import { PollIcon } from "../assets/poll-icon";
import { ScheduleIcon } from "../assets/schedule-icon";

import Action from "./action";
import styles from "./styles/create-tweet.module.scss";
import TweetButton from "./tweet-button";
import User from "./user";

export const CreateTweet = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <User />
      </div>

      <div className={styles.tweet}>
        <div className={styles.text}>
          <textarea placeholder="What's happening?" />
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
            <TweetButton />
          </div>
        </div>
      </div>
    </div>
  );
};
