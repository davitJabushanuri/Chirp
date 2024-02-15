"use client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { LocationIcon } from "@/assets/location-icon";
import { MessageIcon } from "@/assets/message-icon";
import { ReceiveNotificationsIcon } from "@/assets/notifications-icon";
import { Button } from "@/components/elements/button";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { FollowButton } from "@/components/elements/follow-button";
import { Modal } from "@/components/elements/modal";
import { Tooltip } from "@/components/elements/tooltip";

import { WebsiteIcon } from "../assets/website-icon";
import { IUser } from "../types";
import { following } from "../utils/following";

import { EditProfileModal } from "./edit-profile-modal";
import { InspectImageModal } from "./inspect-image-modal";
import styles from "./styles/user-info.module.scss";
import { UserJoinDate } from "./user-join-date";

export const ProfileInfo = ({ user, id }: { user: IUser; id: string }) => {
  const { data: session } = useSession();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const [inspectModal, setInspectModal] = useState({
    isOpen: false,
    source: "",
    sourceType: "",
  });

  const isFollowing = following({
    user: user,
    session_owner_id: session?.user?.id,
  });

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        {user?.profile_banner_url && (
          <button
            className={styles.bannerButton}
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => {
              setInspectModal({
                isOpen: true,
                source: user?.profile_banner_url || "",
                sourceType: "banner",
              });
            }}
          >
            <Image
              src={user?.profile_banner_url}
              alt="banner"
              fill={true}
              draggable={true}
            />
          </button>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <button
            className={styles.avatarButton}
            aria-label="Inspect profile picture"
            onClick={() => {
              setInspectModal({
                isOpen: true,
                source: user?.profile_image_url || "",
                sourceType: "avatar",
              });
            }}
          >
            <Image
              src={user?.profile_image_url || "/user_placeholder.png"}
              alt="avatar"
              draggable={true}
              fill={true}
            />
          </button>
        </div>

        <div className={styles.editProfile}>
          {session?.user?.id === user?.id ? (
            <button
              aria-expanded="false"
              aria-haspopup="menu"
              aria-label="Edit profile"
              onClick={() => setIsEditProfileModalOpen(true)}
              className={styles.editProfileButton}
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {session && (
                <Tooltip text="More">
                  <Button
                    aria-expanded="false"
                    aria-haspopup="menu"
                    aria-label="More"
                    className="border-[1px] border-tertiary-100 p-[0.4em] hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
                  >
                    <DotIcon />
                  </Button>
                </Tooltip>
              )}
              {session && (
                <Tooltip text="Message">
                  <Button
                    aria-label="Message"
                    className="border-[1px] border-tertiary-100 p-[0.4em] hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
                  >
                    <MessageIcon />
                  </Button>
                </Tooltip>
              )}
              {session && (
                <Tooltip text="Notify">
                  <Button
                    aria-label="Turn on Tweet notifications"
                    className="border-[1px] border-tertiary-100 p-[0.4em] hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
                  >
                    <ReceiveNotificationsIcon />
                  </Button>
                </Tooltip>
              )}

              <FollowButton
                user_id={user?.id}
                session_owner_id={session?.user?.id}
                isFollowing={isFollowing}
                username={user?.email?.split("@")[0]}
              />
            </div>
          )}
        </div>

        <div className={styles.user}>
          <div className={styles.name}>
            <EllipsisWrapper>
              <h2>{user?.name}</h2>
            </EllipsisWrapper>

            <EllipsisWrapper>
              <span>@{user?.email?.split("@")[0]}</span>
            </EllipsisWrapper>
          </div>

          {user?.description && (
            <div className={styles.bio}>
              <p>{user?.description}</p>
            </div>
          )}

          <div className={styles.locationAndJoined}>
            {user?.location && (
              <div className={styles.location} role="presentation">
                <LocationIcon />
                <span className={styles.text}>{user?.location}</span>
              </div>
            )}

            {user?.url && (
              <div className={styles.website}>
                <WebsiteIcon />
                <a
                  className={styles.text}
                  href={user?.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {user?.url}
                </a>
              </div>
            )}

            {user?.created_at && <UserJoinDate date={user?.created_at} />}
          </div>

          <div className={styles.stats}>
            <Link href={`/${id}/following`} className={styles.stat}>
              <span className={styles.number}>{user?._count?.following}</span>
              Following
            </Link>
            <Link href={`/${id}/followers`} className={styles.stat}>
              <span className={styles.number}>{user?._count?.followers}</span>
              Followers
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isEditProfileModalOpen && (
          <Modal
            onClose={() => {
              setIsEditProfileModalOpen(false);
            }}
            disableScroll={true}
            background="var(--clr-modal-background)"
          >
            <EditProfileModal
              user={user}
              closeModal={() => setIsEditProfileModalOpen(false)}
            />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {inspectModal.isOpen && (
          <Modal
            onClose={() => {
              setInspectModal({
                isOpen: false,
                source: "",
                sourceType: "",
              });
            }}
            disableScroll={true}
            background="var(--clr-modal-background)"
          >
            <InspectImageModal
              source={inspectModal.source}
              sourceType={inspectModal.sourceType}
              closeModal={() => {
                setInspectModal({
                  isOpen: false,
                  source: "",
                  sourceType: "",
                });
              }}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
