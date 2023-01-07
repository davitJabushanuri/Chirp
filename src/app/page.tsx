"use client";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { ExploreHeader } from "@/components/layout/header";

import styles from "./styles/landing-page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <ExploreHeader />
      <LoadingSpinner />
    </div>
  );
}
