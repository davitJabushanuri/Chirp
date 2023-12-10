import Image from "next/image";
import Link from "next/link";

import styles from "./styles/no-results.module.scss";

export const NoResults = ({ query }: { query: string | undefined }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            src={`/no-results.png`}
            alt="no results"
            width={320}
            height={160}
            quality={100}
            loading="lazy"
          />
        </div>
        <h1>No results for &quot;{query}&quot;</h1>
        <p>
          Try searching for something else, or check your{" "}
          <Link href="/settings">Search settings</Link> to see if they’re
          protecting you from potentially sensitive content.
        </p>
      </div>
    </div>
  );
};
