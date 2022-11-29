"use client";
import { Suspense, use } from "react";

import { Aside } from "@/components/layout/aside";
import { CreateTweetModal } from "@/features/create-tweet";
import { Header } from "@/features/header";
import { MobileNavbar } from "@/features/navbar";
import { HamburgerMenu } from "@/features/navbar";
import { TweetButton } from "@/features/sidebar";
import { Sidebar } from "@/features/sidebar";
import { useColor } from "@/stores/useColor";
import { useHamburger } from "@/stores/useHamburger";
import { useModal } from "@/stores/useModal";
import { useTheme } from "@/stores/useTheme";
import SupabaseListener from "@/utils/supabase-listener";
import supabase from "@/utils/supabaseClient";
import "./layout.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentTheme = useTheme((state) => state.theme);
  const currentColor = useColor((state) => state.color);
  const isModalOpen = useModal((state) => state.isModalOpen);
  const isHamburgerOpen = useHamburger((state) => state.isHamburgerOpen);

  return (
    <html
      className={`${currentTheme || "theme-dim"} ${
        currentColor || "color-blue"
      }`}
      lang="en"
    >
      <body>
        <Suspense fallback={<div>Loading...</div>}>
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
          {isModalOpen && <CreateTweetModal />}
          {isHamburgerOpen && <HamburgerMenu />}
        </Suspense>
      </body>
    </html>
  );
}
