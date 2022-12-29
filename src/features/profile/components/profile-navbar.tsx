import Link from "next/link";

import styles from "./styles/profile-navbar.module.scss";

export const ProfileNavbar = ({
  pathname,
  id,
}: {
  pathname: string | null;
  id: string | null;
}) => {
  return (
    <div className={styles.container}>
      <NavItem text="Tweets" href={`/${id}`} active={pathname === `/${id}`} />
      <NavItem
        text="Tweets & replies"
        href={`/${id}/with-replies`}
        active={pathname === `/${id}/with-replies`}
      />
      <NavItem
        text="Media"
        href={`/${id}/media`}
        active={pathname === `/${id}/media`}
      />
      <NavItem
        text="Likes"
        href={`/${id}/likes`}
        active={pathname === `/${id}/likes`}
      />
    </div>
  );
};

const NavItem = ({
  text,
  href,
  active,
}: {
  text: string;
  href: string;
  active: boolean;
}) => {
  return (
    <Link href={href} className={styles.navItem}>
      <span className={active ? styles.active : ""}>
        <p>{text}</p>
        <div className={styles.border}></div>
      </span>
    </Link>
  );
};
