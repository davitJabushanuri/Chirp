import Link from "next/link";

import styles from "./styles/replying-to.module.scss";

export const ReplyingTo = ({
  screen_name,
  link = true,
}: {
  screen_name: string | null;
  link?: boolean;
}) => {
  return (
    <div className={styles.container}>
      <span>
        Replying to{" "}
        {link ? (
          <Link href={`/${screen_name}`}>@{screen_name}</Link>
        ) : (
          <span className={styles.username}>@{screen_name}</span>
        )}
      </span>
    </div>
  );
};
