"use client";
import { useSession } from "next-auth/react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoadingScreen } from "@/components/elements/loading-screen";
import { Aside } from "@/components/layout/aside";
import { useJoinTwitter } from "@/features/auth";
import { AuthModalTrigger, JoinTwitterModal } from "@/features/auth";
import { CreateTweetModal, MobileTweetButton } from "@/features/create-tweet";
import { HamburgerMenu, MobileNavbar } from "@/features/navbar";
import { Sidebar } from "@/features/sidebar";
import { InspectTweetImageModal } from "@/features/tweets";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";
import { useHamburger } from "@/stores/use-hamburger";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";
import ReactQueryWrapper from "@/utils/react-query";

import styles from "./styles/toast.module.scss";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
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
    <body suppressHydrationWarning={true}>
      {status === "loading" ? (
        <LoadingScreen />
      ) : (
        <ReactQueryWrapper>
          <div className="layout">
            <MobileNavbar />

            <MobileTweetButton />

            <Sidebar />
            <main>{children}</main>
            <Aside />
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar={true}
            transition={Slide}
            closeButton={false}
            closeOnClick={false}
            className={styles.container}
            toastClassName={styles.toast}
          />
          {isTweetModalOpen && <CreateTweetModal />}
          {isHamburgerOpen && <HamburgerMenu />}
          {!session && <AuthModalTrigger />}
          {isJoinTwitterModalOpen && <JoinTwitterModal />}
          {isTweetImageModalOpen && <InspectTweetImageModal />}
        </ReactQueryWrapper>
      )}
    </body>
  );
};
