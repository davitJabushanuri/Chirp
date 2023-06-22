/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";

import { Avatar } from "@/components/designs/avatar";

import styles from "./styles/user.module.scss";

export const UserAvatar = ({
  userId,
  userImage,
  width = "38px",
  height = "38px",
}: {
  userId?: string | undefined;
  userImage: string | null;
  width?: string;
  height?: string;
}) => {
  const router = useRouter();

  return (
    <button
      style={{ width, height }}
      onClick={(e) => {
        e.stopPropagation();
        if (userId) router.push(`/${userId}`);
      }}
      className={styles.container}
    >
      <Avatar userImage={userImage} height={38} width={38} />
    </button>
  );
};
