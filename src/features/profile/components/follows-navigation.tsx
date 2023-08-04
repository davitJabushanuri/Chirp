"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { UseFocusOnActiveTab } from "../hooks/use-focus-on-active-tab";
import { handleNavigationInteraction } from "../utils/handle-navigation-interaction";

import styles from "./styles/follows-navigation.module.scss";

export const FollowsNavigation = () => {
  const pathname = usePathname();
  const path = pathname?.split("/")[2];
  const id = pathname?.split("/")[1];

  return (
    <nav aria-live="polite">
      <div role="tablist" className={styles.container}>
        <FollowsTab path={path} id={id} text="Followers" />
        <FollowsTab path={path} id={id} text="Following" />
      </div>
    </nav>
  );
};

export const FollowsTab = ({
  path,
  id,
  text,
}: {
  path: string;
  id: string;
  text: string;
}) => {
  UseFocusOnActiveTab({
    cookieName: "followers-path",
    path: `/${id}/${text.toLowerCase()}`,
  });

  return (
    <Link
      onKeyDown={(e) =>
        handleNavigationInteraction({
          e,
          path: `/${id}/${text.toLowerCase()}`,
          cookieName: "followers-path",
        })
      }
      aria-selected={path === text.toLowerCase() ? true : false}
      role="tab"
      replace={true}
      className={path === text.toLowerCase() ? styles.active : ""}
      href={`/${id}/${text.toLowerCase()}`}
      tabIndex={path === text.toLowerCase() ? 0 : -1}
    >
      <span className={styles.text}>{text}</span>
    </Link>
  );
};
