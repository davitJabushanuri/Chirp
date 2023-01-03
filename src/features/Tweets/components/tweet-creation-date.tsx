import dayjs from "dayjs";

import styles from "./styles/tweet-creation-date.module.scss";
export const TweetCreationDate = ({ date }: { date: string | undefined }) => {
  return (
    <div className={styles.container}>
      <span>{dayjs(date).format(`h:mm A`)}</span>
      <span>·</span>
      <span>{dayjs(date).format(`MMM D, YYYY`)}</span>
    </div>
  );
};
