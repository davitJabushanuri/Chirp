import Link from "next/link";

import styles from "./styles/navbar-item.module.scss";

const NavItem = ({
  icon,
  title,
  path,
  isActive,
}: {
  icon: React.ReactNode;
  title: string;
  path: string;
  isActive: boolean;
}) => {
  return (
    <Link
      title={title}
      className={styles.container}
      href={`/${path}`}
      aria-label={title}
      style={
        {
          "--nav-tooltip": title,
        } as React.CSSProperties
      }
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
