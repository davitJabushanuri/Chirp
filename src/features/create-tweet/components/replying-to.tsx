import Link from "next/link";

import styles from "./styles/replying-to.module.scss";

export const ReplyingTo = ({ screen_name }: { screen_name: string | null }) => {
  return (
    <div className={styles.container}>
      <p>
        Replying to <Link href={`/${screen_name}`}>@{screen_name}</Link>
      </p>
    </div>
  );
};
