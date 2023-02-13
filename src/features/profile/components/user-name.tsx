import { VerifiedIcon } from "@/assets/verified-icon";

import styles from "./styles/user-name.module.scss";

export const UserName = ({
  name,
  isVerified = false,
}: {
  name: string;
  isVerified: boolean | undefined;
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.name}>{name}</span>
      <span className={styles.verified}>{isVerified && <VerifiedIcon />}</span>
    </div>
  );
};
