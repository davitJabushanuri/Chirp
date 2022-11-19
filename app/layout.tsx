"use client";
import { Aside } from "@/components/layout/aside";
import { Header } from "@/features/header";
import { MobileNavbar } from "@/features/navbar";
import { TweetButton } from "@/features/sidebar";
import { Sidebar } from "@/features/sidebar";
import "./globals.css";
import "./layout.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
          </main>
          <Aside />
        </div>
      </body>
    </html>
  );
}
