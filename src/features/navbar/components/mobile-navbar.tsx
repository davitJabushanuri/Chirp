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
    <div className={styles.container}>
      <NavItem
        aria_label="Home"
        icon={
          pathname === `/` || pathname === `/home` ? <HomeActive /> : <Home />
        }
        title={`Home`}
        path={`home`}
        isActive={pathname === `/` || pathname === `/home`}
      />

      <NavItem
        aria_label="Explore"
        icon={pathname === `/explore` ? <SearchActive /> : <Search />}
        title={`Explore`}
        path={`explore`}
        isActive={pathname === `/explore`}
      />

      <NavItem
        aria_label="Notifications"
        icon={pathname === `/notifications` ? <BellActive /> : <Bell />}
        title={`Notifications`}
        path={`notifications`}
        isActive={pathname === `/notifications`}
      />

      <NavItem
        aria_label="Messages"
        icon={pathname === `/messages` ? <EnvelopeActive /> : <Envelope />}
        title={`Messages`}
        path={`messages`}
        isActive={pathname === `/messages`}
      />
    </div>
  );
};
