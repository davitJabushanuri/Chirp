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
      <NavItem
        text="Tweets"
        href={`/profile/${id}`}
        active={pathname === `/profile/${id}`}
      />
      <NavItem
        text="Tweets & replies"
        href={`/profile/${id}/with-replies`}
        active={pathname === `/profile/${id}/with-replies`}
      />
      <NavItem
        text="Media"
        href={`/profile/${id}/media`}
        active={pathname === `/profile/${id}/media`}
      />
      <NavItem
        text="Likes"
        href={`/profile/${id}/likes`}
        active={pathname === `/profile/${id}/likes`}
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
