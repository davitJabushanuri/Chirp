import { useRouter } from "next/navigation";

import { VerifiedIcon } from "@/assets/verified-icon";

import styles from "./styles/user-name.module.scss";

export const UserName = ({
  userId,
  name,
  isVerified = false,
}: {
  userId: string;
  name: string;
  isVerified: boolean;
}) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/${userId}`);
        }}
        className={styles.name}
      >
        <span className={styles.name}>{name}</span>
        <span className={styles.verified}>
          {isVerified && <VerifiedIcon />}
        </span>
      </button>
    </div>
  );
};
