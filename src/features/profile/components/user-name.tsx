import { VerifiedIcon } from "@/assets/verified-icon";

import styles from "./styles/user-name.module.scss";

export const UserName = ({
  name,
  isVerified = false,
  hover = false,
}: {
  name: string | undefined;
  isVerified?: boolean | undefined;
  hover?: boolean | undefined;
}) => {
  return (
    <span className={`${styles.container} ${hover ? styles.hover : ""}`}>
      {name && name}
      {isVerified && <VerifiedIcon />}
    </span>
  );
};
