import Link from "next/link";

import styles from "./styles/replying-to.module.scss";

export const ReplyingTo = ({
  screen_name,
  id,
}: {
  screen_name: string | null;
  id?: string | null;
}) => {
  return (
    <div className={styles.container}>
      Replying to{" "}
      {id ? (
        <Link
          className={styles.link}
          onClick={(e) => e.stopPropagation()}
          href={`/${id}`}
        >
          @{screen_name}
        </Link>
      ) : (
        <span className={styles.username}>@{screen_name}</span>
      )}
    </div>
  );
};
