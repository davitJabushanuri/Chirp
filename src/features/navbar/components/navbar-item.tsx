import Link from "next/link";

import { INavItemProps } from "../types";

import styles from "./styles/navbar-item.module.scss";

const NavItem = ({
  icon,
  title,
  path,
  isActive,
  aria_label,
}: INavItemProps) => {
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
