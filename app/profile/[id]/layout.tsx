"use client";

import { Profile } from "@/features/profile";

import styles from "./styles/layout.module.scss";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Profile>{children}</Profile>
    </div>
  );
}
