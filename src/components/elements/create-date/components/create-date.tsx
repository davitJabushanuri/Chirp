import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

import styles from "./styles/create-date.module.scss";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "now",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

export const CreateDate = ({ date }: { date: Date | undefined }) => {
  const created = dayjs(date);
  const day = 24 * 60 * 60 * 1000;
  const isMoreThan24Hours = Date.now() - created.valueOf() < day;

  return (
    <time
      title={created.format("h:mm A · MMM D, YYYY")}
      aria-label={created.format("MMM D")}
      className={styles.container}
      dateTime={created.format("YYYY-MM-DDTHH:mm:ssZ")}
    >
      {isMoreThan24Hours ? created.fromNow(true) : created.format("MMM D")}
    </time>
  );
};
