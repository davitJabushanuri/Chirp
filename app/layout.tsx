"use client";
import { Sidebar } from "@/components/Sidebar";
import { MobileNavbar } from "@/features/navbar";
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
          <Sidebar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
