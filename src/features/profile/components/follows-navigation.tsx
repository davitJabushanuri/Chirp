"use client";
import { usePathname } from "next/navigation";

import { NavigationTab } from "./navigation-tab";
import styles from "./styles/follows-navigation.module.scss";

export const FollowsNavigation = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  return (
    <nav aria-live="polite">
      <div role="tablist" className={styles.container}>
        <NavigationTab
          text="Followers"
          href={`/${id}/followers`}
          active={pathname === `/${id}/followers`}
        />

        <NavigationTab
          text="Following"
          href={`/${id}/following`}
          active={pathname === `/${id}/following`}
        />
      </div>
    </nav>
  );
};
