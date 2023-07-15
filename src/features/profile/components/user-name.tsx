import { VerifiedIcon } from "@/assets/verified-icon";

import styles from "./styles/user-name.module.scss";

export const UserName = ({
  name,
  isVerified = false,
}: {
  name: string | undefined;
  isVerified?: boolean | undefined;
}) => {
  return (
    <span className={styles.container}>
      {name && name}
      {isVerified && <VerifiedIcon />}
    </span>
  );
};
