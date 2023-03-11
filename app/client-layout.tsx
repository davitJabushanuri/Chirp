"use client";
import { useSession } from "next-auth/react";

import { LoadingScreen } from "@/components/elements/loading-screen";
import { Aside } from "@/components/layout/aside";
import { useJoinTwitter } from "@/features/auth";
import { AuthModalTrigger, JoinTwitterModal } from "@/features/auth";
import { CreateTweetModal, MobileTweetButton } from "@/features/create-tweet";
import { HamburgerMenu, MobileNavbar } from "@/features/navbar";
import { Sidebar } from "@/features/sidebar";
import { InspectTweetImageModal } from "@/features/tweets";
import { useColor } from "@/stores/use-color";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";
import { useHamburger } from "@/stores/use-hamburger";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";
import { useTheme } from "@/stores/use-theme";
import NextAuthProvider from "@/utils/next-auth-provider";
import ReactQueryWrapper from "@/utils/react-query";

export const ClientLayout = ({
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
  const isTweetModalOpen = useCreateTweetModal((state) => state.isModalOpen);
  const isHamburgerOpen = useHamburger((state) => state.isHamburgerOpen);
  const isTweetImageModalOpen = useInspectTweetImage(
    (state) => state.isTweetImageModalOpen,
  );
  const isJoinTwitterModalOpen = useJoinTwitter(
    (state) => state.data.isModalOpen,
  );

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

                <MobileTweetButton />

                <Sidebar />
                <main>{children}</main>
                <Aside />
              </div>
              {isTweetModalOpen && <CreateTweetModal />}
              {isHamburgerOpen && <HamburgerMenu />}
              {!session && <AuthModalTrigger />}
              {isJoinTwitterModalOpen && <JoinTwitterModal />}
              {isTweetImageModalOpen && <InspectTweetImageModal />}
            </ReactQueryWrapper>
          </>
        )}
      </body>
    </NextAuthProvider>
  );
};
