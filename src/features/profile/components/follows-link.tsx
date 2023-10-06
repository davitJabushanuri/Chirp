import Link from "next/link";

import styles from "./styles/follows-link.module.scss";

export const FollowsLink = ({
  stats,
  text,
  link,
  onClick,
}: {
  stats: number;
  text: string;
  link: string;
  onClick?: () => void;
}) => {
  return (
    <Link href={link} onClick={onClick && onClick} className={styles.container}>
      <strong>{stats}</strong> <span>{text}</span>
    </Link>
  );
};
