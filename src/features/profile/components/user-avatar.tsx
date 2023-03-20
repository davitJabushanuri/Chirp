/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";

import { Avatar } from "@/components/designs/avatar";

import styles from "./styles/user.module.scss";

export const UserAvatar = ({
  userId,
  userImage,
  width = "46px",
  height = "46px",
}: {
  userId?: string | undefined;
  userImage: string | undefined;
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
      <Avatar userImage={userImage} height={46} width={46} />
    </button>
  );
};
