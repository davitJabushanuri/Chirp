"use client";
import { useSession } from "next-auth/react";

import { LoadingScreen } from "@/components/elements/loading-screen";
import { Aside } from "@/components/layout/aside";
import { Header } from "@/components/layout/header";
import { AuthModalTrigger } from "@/features/auth";
import { CreateTweetModal } from "@/features/create-tweet";
import { HamburgerMenu, MobileNavbar } from "@/features/navbar";
import { Sidebar, TweetButton, UserModal } from "@/features/sidebar";
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
  const isHamburgerOpen = useHamburger((state) => state.isHamburgerOpen);
  const isUserModalOpen = useAuthModal((state) => state.isUserModalOpen);

  const { data: session, status } = useSession();

  return (
    <NextAuthProvider>
      <body className={`${currentTheme || theme} ${currentColor || color}`}>
        {status === "loading" ? (
          <LoadingScreen />
        ) : (
          <>
            <ReactQueryWrapper>
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
              {!session && <AuthModalTrigger />}
              {isUserModalOpen && <UserModal />}
            </ReactQueryWrapper>
          </>
        )}
      </body>
    </NextAuthProvider>
  );
};

export default MainLayout;
