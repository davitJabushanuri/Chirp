"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";

import styles from "./styles/session-owner-modal.module.scss";

export const SessionOwnerModal = ({
  style,
  onClose,
}: {
  style: React.CSSProperties;
  onClose: () => void;
}) => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{
        ease: "easeInOut",
        duration: 0.2,
      }}
      className={styles.container}
      style={style}
      role="group"
    >
      <Link href={`/auth/signin`} role="menuitem" onClick={onClose}>
        Add an existing account
      </Link>
      <Link href={`/auth/signout`} role="menuitem" onClick={onClose}>
        Log out @{session?.user?.email.split("@")[0]}
      </Link>
    </motion.div>
  );
};
