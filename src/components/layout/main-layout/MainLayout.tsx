"use client";

import { CreateTweetModal } from "@/features/create-tweet";
import { Header } from "@/features/header";
import { HamburgerMenu, MobileNavbar } from "@/features/navbar";
import { Sidebar, TweetButton } from "@/features/sidebar";
import { useColor } from "@/stores/useColor";
import { useHamburger } from "@/stores/useHamburger";
import { useModal } from "@/stores/useModal";
import { useTheme } from "@/stores/useTheme";
import ReactQueryWrapper from "@/utils/react-query";

import { Aside } from "../aside";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const currentTheme = useTheme((state) => state.theme);
  const currentColor = useColor((state) => state.color);
  const isModalOpen = useModal((state) => state.isModalOpen);
  const isHamburgerOpen = useHamburger((state) => state.isHamburgerOpen);

  return (
    <body className={`${currentTheme} ${currentColor}`}>
      <div className="layout">
        <MobileNavbar />
        <div className="mobile-tweet-button">
          <TweetButton />
        </div>
        <Sidebar />
        <main>
          <Header />
          <ReactQueryWrapper>{children}</ReactQueryWrapper>
        </main>
        <Aside />
      </div>
      {isModalOpen && <CreateTweetModal />}
      {isHamburgerOpen && <HamburgerMenu />}
    </body>
  );
};

export default MainLayout;
