"use client";
import { usePathname } from "next/navigation";

import { BellActive, Bell } from "../assets/bell-icon";
import { Envelope, EnvelopeActive } from "../assets/envelope-icon";
import { HomeActive, Home } from "../assets/home-icon";
import { Search, SearchActive } from "../assets/search-icon";

import NavItem from "./navbar-item";
import styles from "./styles/mobile-navbar.module.scss";

export const MobileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.container}>
      <NavItem
        icon={
          pathname === `/` || pathname === `/home` ? <HomeActive /> : <Home />
        }
        title={`Home`}
        path={`home`}
        isActive={pathname === `/` || pathname === `/home`}
      />

      <NavItem
        icon={pathname === `/explore` ? <SearchActive /> : <Search />}
        title={`Explore`}
        path={`explore`}
        isActive={pathname === `/explore`}
      />

      <NavItem
        icon={pathname === `/notifications` ? <BellActive /> : <Bell />}
        title={`Notifications`}
        path={`notifications`}
        isActive={pathname === `/notifications`}
      />

      <NavItem
        icon={pathname === `/messages` ? <EnvelopeActive /> : <Envelope />}
        title={`Messages`}
        path={`messages`}
        isActive={pathname === `/messages`}
      />
    </nav>
  );
};
