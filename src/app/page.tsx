"use client";

import { ExploreHeader } from "@/components/layout/header";

import styles from "./styles/landing-page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <ExploreHeader />
    </div>
  );
}
