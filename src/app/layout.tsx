import { cookies } from "next/headers";
import { ToastContainer, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./styles/layout.scss";
import { Aside } from "@/features/aside";
import { AuthModalTrigger, JoinTwitterModal } from "@/features/auth";
import { CreateTweetModal, MobileTweetButton } from "@/features/create-tweet";
import { HamburgerMenu, MobileNavbar } from "@/features/navbar";
import { Sidebar } from "@/features/sidebar";
import { InspectTweetImageModal } from "@/features/tweets";
import NextAuthProvider from "@/utils/next-auth-provider";
import ReactQueryWrapper from "@/utils/react-query";

import styles from "./styles/toast.module.scss";
import "./styles/layout.scss";

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies();
  const theme = nextCookies.get("theme");
  const color = nextCookies.get("color");
  const fontSize = nextCookies.get("font-size");

  return (
    <html
      className={`${theme?.value ?? ""} ${color?.value ?? ""} ${
        fontSize?.value ?? ""
      }`}
      lang="en"
    >
      <body suppressHydrationWarning={true}>
        <NextAuthProvider>
          <ReactQueryWrapper>
            <div className="layout">
              <MobileNavbar />

              <MobileTweetButton />

              <Sidebar />

              <main>{children}</main>

              <Aside />

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

              {<CreateTweetModal />}
              {<HamburgerMenu />}
              {<AuthModalTrigger />}
              {<JoinTwitterModal />}
              {<InspectTweetImageModal />}
            </div>
          </ReactQueryWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    default: "Chirp",
    template: "%s / Chirp",
    absolute: "Chirp",
  },

  description: "Chirp is a social media platform for sharing your thoughts.",

  icons: {
    icon: "/twitter-logo.svg",
  },
};
