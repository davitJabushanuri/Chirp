import { usePathname } from "next/navigation";

import { BellActive, Bell } from "../assets/bell-icon";
import { Bookmark, BookmarkActive } from "../assets/bookmark-icon";
import { Envelope, EnvelopeActive } from "../assets/envelope-icon";
import { Gear, GearActive } from "../assets/gear-icon";
import { Hashtag, HashtagActive } from "../assets/hashtag-icon";
import { HomeActive, Home } from "../assets/home-icon";
import { User, UserActive } from "../assets/user-icon";

import NavItem from "./navbar-item";
import styles from "./styles/navbar.module.scss";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <NavItem
        icon={
          pathname === `/` || pathname === `/home` ? <HomeActive /> : <Home />
        }
        title={`Home`}
        isActive={pathname === `/` || pathname === `/home`}
      />

      <NavItem
        icon={pathname === `/explore` ? <HashtagActive /> : <Hashtag />}
        title={`Explore`}
        isActive={pathname === `/explore`}
      />

      <NavItem
        icon={pathname === `/notifications` ? <BellActive /> : <Bell />}
        title={`Notifications`}
        isActive={pathname === `/notifications`}
      />

      <NavItem
        icon={pathname === `/messages` ? <EnvelopeActive /> : <Envelope />}
        title={`Messages`}
        isActive={pathname === `/messages`}
      />

      <NavItem
        icon={pathname === `/bookmarks` ? <BookmarkActive /> : <Bookmark />}
        title={`Bookmarks`}
        isActive={pathname === `/bookmarks`}
      />

      <NavItem
        icon={pathname === `/profile` ? <UserActive /> : <User />}
        title={`Profile`}
        isActive={pathname === `/profile`}
      />

      <NavItem
        icon={pathname === `/settings` ? <GearActive /> : <Gear />}
        title={`Settings`}
        isActive={pathname === `/settings`}
      />
    </div>
  );
};
