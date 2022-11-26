import { EmojiIcon } from "../assets/Emoji";
import { GifIcon } from "../assets/Gif";
import { ImageIcon } from "../assets/Image";
import { LocationIcon } from "../assets/Location";
import { PollIcon } from "../assets/Poll";
import { ScheduleIcon } from "../assets/Schedule";

import Action from "./Action";
import styles from "./styles/CreateTweet.module.scss";
import TweetButton from "./TweetButton";
import User from "./User";

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
