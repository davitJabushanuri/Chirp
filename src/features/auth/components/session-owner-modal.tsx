"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

import styles from "./styles/session-owner-modal.module.scss";

export const SessionOwnerModal = ({
  style,
}: {
  style: React.CSSProperties;
}) => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className={styles.container} style={style} role="group">
      <Link href={`/auth/signin`} role="menuitem">
        Add an existing account
      </Link>
      <Link href={`/auth/signout`} role="menuitem">
        Log out @{session?.user?.email.split("@")[0]}
      </Link>
    </div>
  );
};
