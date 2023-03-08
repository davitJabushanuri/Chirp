import { CloseIcon } from "@/assets/close-icon";
import { CommentIcon, CommentIconFill } from "@/assets/comment-icon";
import { FollowIcon } from "@/assets/follow-icon";
import { HeartIconActive } from "@/assets/heart-icon";
import { RetweetIcon } from "@/assets/retweet-icon";

import { useJoinTwitter } from "../stores/useJoinTwitter";

import styles from "./styles/join-twitter-modal.module.scss";

export const JoinTwitterModal = () => {
  const data = useJoinTwitter((state) => state.data);
  const setJoinTwitterData = useJoinTwitter((state) => state.setData);

  const variants = {
    comment: {
      icon: <CommentIcon />,
      title: `Reply to join the conversation.`,
      subtitle: `Once you join Twitter, you can respond to ${data.user}’s Tweet.`,
    },

    retweet: {
      icon: <RetweetIcon />,
      title: `Retweet to spread the word.`,
      subtitle: `When you join Twitter, you can share ${data.user}’s Tweet with your followers.`,
    },

    like: {
      icon: <HeartIconActive />,
      title: `Like a Tweet to share the love.`,
      subtitle: `Join Twitter now to let ${data.user} know you like their Tweet.`,
    },

    follow: {
      icon: <FollowIcon />,
      title: `Follow ${data.user} to see what they share on Twitter.`,
      subtitle: `Sign up so you never miss their Tweets.`,
    },
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() =>
          setJoinTwitterData({
            isModalOpen: false,
            action: "",
            user: "",
          })
        }
        className={styles.overlay}
      />
      <div className={styles.modal}>
        <div className={styles.close}>
          <button
            onClick={() =>
              setJoinTwitterData({
                isModalOpen: false,
                action: "",
                user: "",
              })
            }
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>{variants.comment.icon}</span>
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <h1 className={styles.title}>{variants.comment.title}</h1>
              <p className={styles.subtitle}>{variants.comment.subtitle}</p>

              <div className={styles.buttons}>
                <button className={styles.signin}>Log in</button>
                <button className={styles.signup}>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
