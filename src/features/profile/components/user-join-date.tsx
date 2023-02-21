import dayjs from "dayjs";

import { CalendarIcon } from "../assets/calendar-icon";

import styles from "./styles/user-join-date.module.scss";

export const UserJoinDate = ({
  date,
  showIcon = true,
}: {
  date: string | undefined;
  showIcon?: boolean;
}) => {
  return (
    <div className={styles.container}>
      {showIcon && (
        <span className={styles.icon}>
          <CalendarIcon />
        </span>
      )}
      <span className={styles.text}>
        Joined {dayjs(date).format("MMMM YYYY")}
      </span>
    </div>
  );
};
