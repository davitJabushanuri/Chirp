import { useSession } from "next-auth/react";

import { BackButton } from "@/components/elements/back-button";

import styles from "./styles/bookmarks-header.module.scss";

export const BookmarksHeader = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <BackButton />
      </div>

      <div className={styles.user}>
        <h2 className={styles.title}>Bookmarks</h2>
        {session?.user?.email && <p>@{session?.user?.email?.split("@")[0]}</p>}
      </div>
    </div>
  );
};
