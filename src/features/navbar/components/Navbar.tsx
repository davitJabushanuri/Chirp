import { usePathname } from "next/navigation";

import { BellActive, Bell } from "../assets/bell";
import { Bookmark, BookmarkActive } from "../assets/bookmark";
import { Envelope, EnvelopeActive } from "../assets/envelope";
import { Gear } from "../assets/gear";
import { Hashtag, HashtagActive } from "../assets/hashtag";
import { HomeActive, Home } from "../assets/home";
import { User, UserActive } from "../assets/user";

import NavItem from "./NavItem";
import styles from "./styles/Navbar.module.scss";

export const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className={styles.container}>
      <NavItem
        icon={
          pathname === `/` || pathname === `/home` ? (
            <HomeActive color="#ccc" />
          ) : (
            <Home color="#ccc" />
          )
        }
        title={`Home`}
        isActive={pathname === `/` || pathname === `/home`}
      />

      <NavItem
        icon={
          pathname === `/explore` ? (
            <HashtagActive color="#ccc" />
          ) : (
            <Hashtag color="#ccc" />
          )
        }
        title={`Explore`}
        isActive={pathname === `/explore`}
      />

      <NavItem
        icon={
          pathname === `/notifications` ? (
            <BellActive color="#ccc" />
          ) : (
            <Bell color="#ccc" />
          )
        }
        title={`Notifications`}
        isActive={pathname === `/notifications`}
      />

      <NavItem
        icon={
          pathname === `/messages` ? (
            <EnvelopeActive color="#ccc" />
          ) : (
            <Envelope color="#ccc" />
          )
        }
        title={`Messages`}
        isActive={pathname === `/messages`}
      />

      <NavItem
        icon={
          pathname === `/bookmarks` ? (
            <BookmarkActive color="#ccc" />
          ) : (
            <Bookmark color="#ccc" />
          )
        }
        title={`Bookmarks`}
        isActive={pathname === `/bookmarks`}
      />

      <NavItem
        icon={
          pathname === `/profile` ? (
            <UserActive color="#ccc" />
          ) : (
            <User color="#ccc" />
          )
        }
        title={`Profile`}
        isActive={pathname === `/profile`}
      />

      <NavItem
        icon={
          pathname === `/settings` ? (
            <Gear color="#ccc" />
          ) : (
            <Gear color="#ccc" />
          )
        }
        title={`Settings`}
        isActive={pathname === `/settings`}
      />
    </div>
  );
};
