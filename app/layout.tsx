"use client";
import { TweetButton } from "@/components/Elements/TweetButton";
import { Header } from "@/features/header";
import { MobileNavbar } from "@/features/navbar";
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
        </div>
      </body>
    </html>
  );
}
