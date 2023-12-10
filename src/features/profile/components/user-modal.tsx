/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { forwardRef } from "react";
import { createPortal } from "react-dom";

import { FollowButton } from "@/components/elements/follow-button";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { useTrackPosition } from "@/components/elements/modal";
import { TryAgain } from "@/components/elements/try-again";

import { useUser } from "../hooks/use-user";
import { following } from "../utils/following";

import styles from "./styles/user-modal.module.scss";

export const UserModal = forwardRef<HTMLDivElement, { userId: string }>(
  ({ userId }, ref) => {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session } = useSession();
    const { data: user, isPending, isError } = useUser({ id: userId });
    const buttonBoundaries = useTrackPosition({
      buttonRef: ref as React.RefObject<HTMLButtonElement>,
      trackScroll: true,
    });

    const isFollowing = following({
      user,
      session_owner_id: session?.user?.id,
    });

    const style: React.CSSProperties = {
      position: "fixed",
      top: buttonBoundaries?.top,
      left: buttonBoundaries?.left,
      transform: `translate(-50%, calc(${buttonBoundaries?.height}px + 10px))`,
    };

    return createPortal(
      <motion.div
        style={style}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.container}
      >
        {isPending ? (
          <LoadingSpinner />
        ) : isError ? (
          <TryAgain />
        ) : (
          <>
            {" "}
            <div className={styles.hero}>
              <div className={styles.avatar}>
                <Image
                  src={user?.profile_image_url || "/user_placeholder.png"}
                  alt={user?.name}
                  width={60}
                  height={60}
                />
              </div>

              <div className={styles.follow}>
                <FollowButton
                  user_id={user?.id}
                  session_owner_id={session?.user?.id}
                  isFollowing={isFollowing}
                  username={user?.email?.split("@")[0]}
                />
              </div>
            </div>
            <div className={styles.userDetails}>
              <h2 className={styles.name}>{user?.name}</h2>
              <span className={styles.username}>
                @{user?.email?.split("@")[0]}
              </span>

              {user?.description && (
                <p className={styles.description}>{user?.description}</p>
              )}

              <div className={styles.stats}>
                <button
                  onClick={() => router.push(`${pathname}/following`)}
                  className={styles.stat}
                >
                  <span className={styles.number}>
                    {user?.following?.length || 0}
                  </span>
                  <span className={styles.text}>Following</span>
                </button>
                <button
                  onClick={() => router.push(`${pathname}/followers`)}
                  className={styles.stat}
                >
                  <span className={styles.number}>
                    {user?.followers?.length || 0}
                  </span>
                  <span className={styles.text}>Followers</span>
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>,
      document.body,
    );
  },
);

UserModal.displayName = "UserModal";
