import Link from "next/link";

import styles from "./styles/link-to-profile.module.scss";

export const LinkToProfile = ({
  userId,
  tabIndex = 0,
  children,
}: {
  userId: string | undefined;
  tabIndex?: number;
  children: React.ReactNode;
}) => {
  return (
    <Link className={styles.container} tabIndex={tabIndex} href={`/${userId}`}>
      {children}
    </Link>
  );
};
