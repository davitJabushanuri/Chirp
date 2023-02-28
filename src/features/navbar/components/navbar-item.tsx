import { useRouter } from "next/navigation";

import { INavItemProps } from "../types";

import styles from "./styles/navbar-item.module.scss";

const NavItem = ({ icon, title, path, isActive }: INavItemProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/${path}`)}
      className={styles.container}
    >
      <div className={styles.navItem}>
        <span className={styles.icon}>{icon}</span>
        <span className={`${styles.text} ${isActive ? styles.active : ""}`}>
          {title}
        </span>
      </div>
    </button>
  );
};

export default NavItem;
