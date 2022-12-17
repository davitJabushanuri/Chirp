import Link from "next/link";

import { INavItemProps } from "../types";

import styles from "./styles/navbar-item.module.scss";

const NavItem = ({ icon, title, path, isActive }: INavItemProps) => {
  return (
    <>
      <Link className={styles.link} href={`/${path}`}>
        <div className={styles.container}>
          <div className={styles.icon}>{icon}</div>
          <span className={isActive ? styles.active : ""}>{title}</span>
        </div>
      </Link>
    </>
  );
};

export default NavItem;
