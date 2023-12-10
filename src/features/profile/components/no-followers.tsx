import Image from "next/image";

import styles from "./styles/no-followers.module.scss";

export const NoFollowers = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src={`/no-followers.png`}
          alt={`no followers`}
          width={1000}
          height={1000}
        />
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};
