"use client";
import { usePathname } from "next/navigation";

import { Tooltip } from "@/components/elements/tooltip";

import { BellActive, Bell } from "../assets/bell-icon";
import { Envelope, EnvelopeActive } from "../assets/envelope-icon";
import { HomeActive, Home } from "../assets/home-icon";
import { Search, SearchActive } from "../assets/search-icon";

import NavItem from "./navbar-item";

export const MobileNavbar = () => {
  const pathname = usePathname();

  if (pathname.split("/")[1] === `messages`) return null;

  return (
    <nav
      className="fixed bottom-0 z-fixed grid w-full grid-flow-col place-items-center border-t-[1px] border-neutral-600 bg-background sm:hidden"
      aria-label="Primary"
    >
      <Tooltip text="Home" maxWidth={1300}>
        <NavItem
          href={`/home`}
          icon={pathname === `/home` ? <HomeActive /> : <Home />}
          text="Home"
          aria-label="Home"
          isActive={pathname === `/home`}
        />
      </Tooltip>

      <Tooltip text="Explore" maxWidth={1300}>
        <NavItem
          href={`/explore`}
          icon={pathname === `/explore` ? <SearchActive /> : <Search />}
          text="Explore"
          aria-label="Search and Explore"
          isActive={pathname === `/explore`}
        />
      </Tooltip>

      <Tooltip text="Notifications" maxWidth={1300}>
        <NavItem
          href={`/notifications`}
          icon={pathname === `/notifications` ? <BellActive /> : <Bell />}
          text="Notifications"
          aria-label="Notifications"
          isActive={pathname === `/notifications`}
        />
      </Tooltip>

      <Tooltip text="Messages" maxWidth={1300}>
        <NavItem
          href={`/messages`}
          icon={pathname === `/messages` ? <EnvelopeActive /> : <Envelope />}
          text="Messages"
          aria-label="Direct Messages"
          isActive={pathname === `/messages`}
        />
      </Tooltip>
    </nav>
  );
};
