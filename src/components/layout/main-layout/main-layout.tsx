"use client";

import { Aside } from "@/components/layout/aside";
import { Header } from "@/components/layout/header";
import { AuthModal, AuthModalTrigger } from "@/features/auth";
import { CreateTweetModal } from "@/features/create-tweet";
import { HamburgerMenu, MobileNavbar } from "@/features/navbar";
import { Sidebar, TweetButton } from "@/features/sidebar";
import { useAuthModal } from "@/stores/useAuthModal";
import { useColor } from "@/stores/useColor";
import { useHamburger } from "@/stores/useHamburger";
import { useTheme } from "@/stores/useTheme";
import { useTweetModal } from "@/stores/useTweetModal";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const currentTheme = useTheme((state) => state.theme);
  const currentColor = useColor((state) => state.color);
  const isTweetModalOpen = useTweetModal((state) => state.isModalOpen);
  const isAuthModalOpen = useAuthModal((state) => state.isModalOpen);
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
          {children}
        </main>
        <Aside />
      </div>
      {isTweetModalOpen && <CreateTweetModal />}
      {isHamburgerOpen && <HamburgerMenu />}
      {!true && <AuthModalTrigger />}
      {isAuthModalOpen && <AuthModal />}
    </body>
  );
};

export default MainLayout;
