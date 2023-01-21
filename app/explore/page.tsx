"use client";
import { ExploreHeader } from "@/components/layout/header";
import { Explore } from "@/features/explore";

import styles from "./styles/explore.module.scss";

const ExplorePage = () => {
  return (
    <div className={styles.container}>
      <ExploreHeader />
      <Explore />
    </div>
  );
};

export default ExplorePage;
