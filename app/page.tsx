import { LoadingSpinner } from "@/components/elements/loading-spinner";

import styles from "./styles/landing-page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <LoadingSpinner />
    </div>
  );
}
