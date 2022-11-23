"use client";
import { useState } from "react";

import { Aside } from "@/components/layout/aside";
import { Header } from "@/features/header";
import { MobileNavbar } from "@/features/navbar";
import { TweetButton } from "@/features/sidebar";
import { Sidebar } from "@/features/sidebar";

import "./layout.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("theme-dim");

  return (
    <html className={`${theme} color-purple`} lang="en">
      <body>
        <div className="layout">
          <MobileNavbar />
          <div className="mobile-tweet-button">
            <TweetButton />
          </div>
          <Sidebar />
          <main>
            <Header />
            {children}
            <button
              onClick={() =>
                setTheme((prev) => {
                  return prev === "theme-light" ? "theme-dark" : "theme-light";
                })
              }
            >
              switch theme
            </button>
          </main>
          <Aside />
        </div>
      </body>
    </html>
  );
}
