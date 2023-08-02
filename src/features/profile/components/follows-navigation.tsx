"use client";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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

const FollowsTab = ({
  path,
  id,
  text,
}: {
  path: string;
  id: string;
  text: string;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "ArrowRight") {
      if (!e.currentTarget.nextElementSibling) {
        (
          e.currentTarget?.parentElement?.firstElementChild as HTMLElement
        )?.focus();
      } else (e.currentTarget.nextElementSibling as HTMLElement)?.focus();
    }
    if (e.key === "ArrowLeft") {
      if (!e.currentTarget.previousElementSibling) {
        (
          e.currentTarget?.parentElement?.lastElementChild as HTMLElement
        )?.focus();
      } else (e.currentTarget.previousElementSibling as HTMLElement)?.focus();
    }

    if (e.key === "Enter") {
      if (e.currentTarget.ariaSelected === "true") {
        return;
      }

      e.currentTarget.click();
      setCookie("followers-nav-item-id", text.toLowerCase());
    }
  };

  useEffect(() => {
    const tab = getCookie("followers-nav-item-id");

    if (tab) {
      const element = document.querySelector(`[href="/${id}/${tab}"]`);

      if (element) {
        (element as HTMLElement).focus();
        deleteCookie("followers-nav-item-id");
      }
    }
  }, [id]);

  return (
    <Link
      onKeyDown={handleKeyDown}
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
