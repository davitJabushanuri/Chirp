import dayjs from "dayjs";
import Link from "next/link";

import styles from "./styles/tweet-creation-date.module.scss";
export const TweetCreationDate = ({
  date,
  link = "#",
}: {
  date: Date | undefined;
  link?: string;
}) => {
  const created = dayjs(date);

  return (
    <div className={styles.container}>
      <Link
        href={`/status/${link}`}
        aria-label={created.format(`h:mm A · MMM D, YYYY`)}
        data-title={created.format(`h:mm A · MMM D, YYYY`)}
      >
        <time dateTime={created.format(`YYYY-MM-DDTHH:mm:ssZ`)}>
          {created.format(`h:mm A · MMM D, YYYY`)}
        </time>
      </Link>
    </div>
  );
};
