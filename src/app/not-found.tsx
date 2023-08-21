import Link from "next/link";

import styles from "./styles/not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <span>
        Hmm...this page doesn’t exist. Try searching for something else.
      </span>

      <Link href="/explore">Search</Link>
    </div>
  );
}

export const metadata = {
  title: "Page not found",
};
