import { useRouter } from "next/navigation";

import styles from "./styles/user-screen-name.module.scss";

export const UserScreenName = ({
  userId,
  screenName,
}: {
  userId: string;
  screenName: string;
}) => {
  const router = useRouter();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/${userId}`);
      }}
      className={styles.container}
    >
      @{screenName}
    </button>
  );
};
