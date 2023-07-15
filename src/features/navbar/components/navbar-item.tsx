import Link from "next/link";

import styles from "./styles/navbar-item.module.scss";

const NavItem = ({
  icon,
  title,
  path,
  isActive,
  aria_label,
}: {
  icon: React.ReactNode;
  title: string;
  path: string;
  isActive: boolean;
  aria_label: string;
}) => {
  return (
    <Link
      className={styles.container}
      href={`/${path}`}
      aria-label={aria_label}
    >
      <div className={styles.navItem}>
        <span className={styles.icon}>{icon}</span>
        <span className={`${styles.text} ${isActive ? styles.active : ""}`}>
          {title}
        </span>
      </div>
    </Link>
  );
};

export default NavItem;
