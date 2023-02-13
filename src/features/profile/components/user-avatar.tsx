/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";

import styles from "./styles/user.module.scss";

export const UserAvatar = ({
  userId,
  userImage,
}: {
  userId: string | undefined;
  userImage: string | undefined;
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
      {userImage ? (
        <img src={userImage} alt="" />
      ) : (
        <img src="/user_placeholder.png" alt="" />
      )}
    </button>
  );
};
