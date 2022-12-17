import { usePathname } from "next/navigation";

import { BackButton } from "@/components/elements/back-button";
import { HamburgerButton } from "@/components/elements/hamburger-button";

import { BookmarksHeader } from "./bookmarks-header";
import { ExploreHeader } from "./explore-heder";
import { HomeHeader } from "./home-header";
import { MessagesHeader } from "./messages-header";
import { NotificationsHeader } from "./notifications-header";
import { ProfileHeader } from "./profile-header";
import { SettingsHeader } from "./settings-header";
import styles from "./styles/header.module.scss";
import { TweetHeader } from "./tweet-header";

export const Header = () => {
  const pathname = usePathname();

  return (
    <div id="home" className={styles.container}>
      {pathname === "/bookmarks" ||
      pathname?.split("/")[1] === "profile" ||
      pathname?.split("/")[1] === "status" ? (
        <div className={styles.backButton}>
          <BackButton />
        </div>
      ) : (
        <div className={styles.hamburgerButton}>
          <HamburgerButton />
        </div>
      )}
      {pathname === "/home" ? (
        <HomeHeader />
      ) : pathname === "/explore" || pathname === "/" ? (
        <ExploreHeader />
      ) : pathname === "/notifications" ? (
        <NotificationsHeader />
      ) : pathname === "/messages" ? (
        <MessagesHeader />
      ) : pathname === "/bookmarks" ? (
        <BookmarksHeader />
      ) : pathname?.split("/")[1] === "profile" ? (
        <ProfileHeader />
      ) : pathname?.split("/")[1] === "status" ? (
        <TweetHeader />
      ) : pathname === "/settings" ? (
        <SettingsHeader />
      ) : null}
    </div>
  );
};
