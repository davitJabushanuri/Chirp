"use client";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseButton } from "@/components/elements/close-button";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { HeaderHeading } from "@/features/header";

import styles from "./styles/profile-header.module.scss";

export const ProfileHeader = ({
  heading,
  stats,
}: {
  heading: string | undefined;
  stats: string | undefined;
}) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <CloseButton
        onClick={() => {
          router.back();
        }}
        ariaLabel="Back"
        title="Back"
      >
        <BackArrowIcon />
      </CloseButton>

      <div className={styles.user}>
        <HeaderHeading title={heading || "Profile"} />
        <EllipsisWrapper>
          <span>{stats}</span>
        </EllipsisWrapper>
      </div>
    </div>
  );
};
