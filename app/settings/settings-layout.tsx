"use client";

import { SettingsHeader } from "@/components/layout/header";

import styles from "./styles/settings.module.scss";

export const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <SettingsHeader />
      {children}
    </div>
  );
};
