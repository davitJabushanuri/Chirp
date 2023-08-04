import Link from "next/link";

import { UseFocusOnActiveTab } from "../hooks/use-focus-on-active-tab";
import { handleNavigationInteraction } from "../utils/handle-navigation-interaction";

import styles from "./styles/navigation-tab.module.scss";

export const NavigationTab = ({
  text,
  href,
  active,
}: {
  text: string;
  href: string;
  active: boolean;
}) => {
  UseFocusOnActiveTab({
    path: href,
  });

  return (
    <Link
      className={`${styles.container} ${active ? styles.active : ""}`}
      href={href}
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      replace={true}
      prefetch={true}
      onKeyDown={(e) => {
        handleNavigationInteraction({
          e,
          path: href,
        });
      }}
    >
      <span className={styles.text}>{text}</span>
    </Link>
  );
};
