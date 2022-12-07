"use client";

import { Aside } from "@/components/layout/aside";
import { Header } from "@/components/layout/header";
import { AuthModalTrigger } from "@/features/auth";
import { CreateTweetModal } from "@/features/create-tweet";
import { HamburgerMenu, MobileNavbar } from "@/features/navbar";
import { Sidebar, TweetButton } from "@/features/sidebar";
import { useColor } from "@/stores/useColor";
import { useHamburger } from "@/stores/useHamburger";
import { useModal } from "@/stores/useModal";
import { useTheme } from "@/stores/useTheme";
import ReactQueryWrapper from "@/utils/react-query";

const MainLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
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
      <AuthModalTrigger />
    </body>
  );
};

export default MainLayout;
