import { usePathname } from "next/navigation";

import { BellActive, Bell } from "../assets/bell";
import { Envelope, EnvelopeActive } from "../assets/envelope";
import { HomeActive, Home } from "../assets/home";
import { Search, SearchActive } from "../assets/search";

import NavItem from "./NavItem";
import styles from "./styles/MobileNavbar.module.scss";

export const MobileNavbar = () => {
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
        icon={pathname === `/explore` ? <SearchActive /> : <Search />}
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
    </div>
  );
};
