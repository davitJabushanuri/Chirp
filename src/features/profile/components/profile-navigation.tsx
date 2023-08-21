"use client";

import { NavigationTab } from "./navigation-tab";
import styles from "./styles/profile-navigation.module.scss";

export const ProfileNavigation = ({
  id,
  pathname,
}: {
  id: string;
  pathname: string;
}) => {
  return (
    <nav aria-label="Profile timelines" aria-live="polite">
      <div className={styles.container} role="tablist">
        <NavigationTab
          text="Tweets"
          href={`/${id}`}
          active={pathname === `/${id}`}
        />
        <NavigationTab
          text="Replies"
          href={`/${id}/with-replies`}
          active={pathname === `/${id}/with-replies`}
        />
        <NavigationTab
          text="Media"
          href={`/${id}/media`}
          active={pathname === `/${id}/media`}
        />
        <NavigationTab
          text="Likes"
          href={`/${id}/likes`}
          active={pathname === `/${id}/likes`}
        />
      </div>
    </nav>
  );
};
