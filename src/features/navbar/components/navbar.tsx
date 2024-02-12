import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { Tooltip } from "@/components/elements/tooltip";

import { BellActive, Bell } from "../assets/bell-icon";
import { Bookmark, BookmarkActive } from "../assets/bookmark-icon";
import { Envelope, EnvelopeActive } from "../assets/envelope-icon";
import { Gear, GearActive } from "../assets/gear-icon";
import { Hashtag, HashtagActive } from "../assets/hashtag-icon";
import { HomeActive, Home } from "../assets/home-icon";
import { User, UserActive } from "../assets/user-icon";

import NavItem from "./navbar-item";

export const Navbar = () => {
  const pathname = usePathname();
  const path = pathname?.split("/")[1];
  const { data: session } = useSession();

  return (
    <nav
      aria-label="Primary"
      className="flex flex-col items-center xxl:items-start"
    >
      {session && (
        <Tooltip text="Home" maxWidth={1300}>
          <NavItem
            href={`/home`}
            icon={pathname === `/home` ? <HomeActive /> : <Home />}
            text="Home"
            aria-label="Home"
            isActive={pathname === `/home`}
          />
        </Tooltip>
      )}

      <Tooltip text="Explore" maxWidth={1300}>
        <NavItem
          href={`/explore`}
          icon={pathname === `/explore` ? <HashtagActive /> : <Hashtag />}
          text="Explore"
          aria-label="Search and Explore"
          isActive={pathname === `/explore`}
        />
      </Tooltip>

      {session && (
        <Tooltip text="Notifications" maxWidth={1300}>
          <NavItem
            href={`/notifications`}
            icon={pathname === `/notifications` ? <BellActive /> : <Bell />}
            text="Notifications"
            aria-label="Notifications"
            isActive={pathname === `/notifications`}
          />
        </Tooltip>
      )}

      {session && (
        <Tooltip text="Messages" maxWidth={1300}>
          <NavItem
            href={`/messages`}
            icon={pathname === `/messages` ? <EnvelopeActive /> : <Envelope />}
            text="Messages"
            aria-label="Direct Messages"
            isActive={pathname === `/messages`}
          />
        </Tooltip>
      )}

      {session && (
        <Tooltip text="Bookmarks" maxWidth={1300}>
          <NavItem
            href={`/bookmarks`}
            icon={pathname === `/bookmarks` ? <BookmarkActive /> : <Bookmark />}
            text="Bookmarks"
            aria-label="Bookmarks"
            isActive={pathname === `/bookmarks`}
          />
        </Tooltip>
      )}

      {session && (
        <Tooltip text="Profile" maxWidth={1300}>
          <NavItem
            href={`/${session?.user?.id}`}
            icon={path === `${session?.user?.id}` ? <UserActive /> : <User />}
            text="Profile"
            aria-label="Profile"
            isActive={path === `${session?.user?.id}`}
          />
        </Tooltip>
      )}

      <Tooltip text="Settings" maxWidth={1300}>
        <NavItem
          href={`/settings`}
          icon={pathname === `/settings` ? <GearActive /> : <Gear />}
          text="Settings"
          aria-label="Settings"
          isActive={pathname === `/settings`}
        />
      </Tooltip>
    </nav>
  );
};
