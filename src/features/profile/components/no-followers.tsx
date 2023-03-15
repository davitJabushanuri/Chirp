import Image from "next/image";

import styles from "./styles/no-followers.module.scss";

export const NoFollowers = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src={`/no-followers.png`}
          alt={`no followers`}
          width={1000}
          height={1000}
        />
        <h1>Looking for followers?</h1>
        <p>
          When someone follows this account, they&apos;ll show up here. Tweeting
          and interacting with others helps boost followers.
        </p>
      </div>
    </div>
  );
};
