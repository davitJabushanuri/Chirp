"use client";

import { HamburgerButton } from "@/components/elements/hamburger-button";

import styles from "./styles/settings-header.module.scss";

export const SettingsHeader = () => {
  return (
    <div className={styles.container}>
      <HamburgerButton />
      <h2 className={styles.title}>Settings</h2>
    </div>
  );
};
