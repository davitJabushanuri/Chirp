import { cookies } from "next/headers";
import { ToastContainer, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./styles/layout.scss";
import "./styles/tailwind.css";
import { Aside } from "@/features/aside";
import { AuthModalTrigger } from "@/features/auth";
import { MobileTweetButton } from "@/features/create-tweet";
import { MobileNavbar } from "@/features/navbar";
import { Sidebar } from "@/features/sidebar";
import { NextAuthProvider } from "@/utils/next-auth-provider";
import { ReactQueryProvider } from "@/utils/react-query-provider";

import { Hamburger } from "./hamburger";
import { JoinTwitter } from "./join-twitter";
import styles from "./styles/toast.module.scss";
import "./styles/layout.scss";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies();
  const theme = nextCookies.get("theme")?.value;
  const color = nextCookies.get("color")?.value;
  const fontSize = nextCookies.get("font-size")?.value;

  return (
    <html
      {...(theme && { "data-theme": theme })}
      {...(color && { "data-color": color })}
      {...(fontSize && { "data-fontsize": fontSize })}
      lang="en"
    >
      <body suppressHydrationWarning={true}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <div className="layout">
              <MobileNavbar />
              <div className="fixed bottom-20 right-4 z-fixed sm:hidden">
                <MobileTweetButton />
              </div>

              <Sidebar />

              <main aria-label="Home timeline" id="home-timeline">
                {children}
              </main>

              <Aside />

              <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={true}
                transition={Slide}
                closeButton={false}
                closeOnClick={true}
                className={styles.container}
                toastClassName={styles.toast}
                role="alert"
              />

              <AuthModalTrigger />
              <JoinTwitter />
              <Hamburger />
            </div>
          </ReactQueryProvider>
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
