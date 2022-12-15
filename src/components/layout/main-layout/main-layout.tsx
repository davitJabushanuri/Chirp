"use client";
import { useSession } from "next-auth/react";

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
import NextAuthProvider from "@/utils/next-auth-provider";
import ReactQueryWrapper from "@/utils/react-query";

const MainLayout = ({
  children,
  theme,
  color,
}: {
  children: React.ReactNode;
  theme: string | undefined;
  color: string | undefined;
}) => {
  const currentTheme = useTheme((state) => state.theme);
  const currentColor = useColor((state) => state.color);
  const isTweetModalOpen = useTweetModal((state) => state.isModalOpen);
  const isAuthModalOpen = useAuthModal((state) => state.isModalOpen);
  const isHamburgerOpen = useHamburger((state) => state.isHamburgerOpen);

  const { data: session } = useSession();

  return (
    <NextAuthProvider>
      <body className={`${currentTheme || theme} ${currentColor || color}`}>
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
        {isTweetModalOpen && <CreateTweetModal />}
        {isHamburgerOpen && <HamburgerMenu />}
        {!session && <AuthModalTrigger />}
        {isAuthModalOpen && <AuthModal />}
      </body>
    </NextAuthProvider>
  );
};

export default MainLayout;
