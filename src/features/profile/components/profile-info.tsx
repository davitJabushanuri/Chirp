"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { DotIcon } from "@/assets/dot-icon";
import { LocationIcon } from "@/assets/location-icon";
import { MessageIcon } from "@/assets/message-icon";
import { ReceiveNotificationsIcon } from "@/assets/notifications-icon";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { FollowButton } from "@/components/elements/follow-button";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { useEditProfile } from "@/stores/use-edit-profile";
import { useInspectImage } from "@/stores/use-inspect-profile-image";

import { WebsiteIcon } from "../assets/website-icon";
import { useUser } from "../hooks/use-user";
import { IUser } from "../types";
import { following } from "../utils/following";

import { EditProfileModal } from "./edit-profile-modal";
import { InspectImageModal } from "./inspect-image-modal";
import styles from "./styles/user-info.module.scss";
import { UserJoinDate } from "./user-join-date";

export const ProfileInfo = ({ initialUser }: { initialUser: IUser }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  const {
    data: user,
    isLoading,
    isError,
  } = useUser({
    id,
    initialData: initialUser,
  });

  const openEditProfileModal = useEditProfile(
    (state) => state.openEditProfileModal,
  );

  const openInspectModal = useInspectImage((state) => state.openInspectModal);
  const setSource = useInspectImage((state) => state.setSource);
  const setSourceType = useInspectImage((state) => state.setSourceType);

  const isEditProfileModalOpen = useEditProfile(
    (state) => state.isEditProfileModalOpen,
  );
  const isInspectModalOpen = useInspectImage(
    (state) => state.isInspectModalOpen,
  );

  const isFollowing = following({
    user: user,
    session_owner_id: session?.user?.id,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        {user?.profile_banner_url && (
          <button
            className={styles.bannerButton}
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => {
              setSource(user?.profile_banner_url || "");
              setSourceType("banner");
              openInspectModal();
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
              setSource(user?.profile_image_url || "");
              setSourceType("avatar");
              openInspectModal();
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
              onClick={() => openEditProfileModal()}
              className={styles.editProfileButton}
            >
              Edit Profile
            </button>
          ) : (
            <div className={styles.visitorActions}>
              {session && (
                <button
                  aria-expanded="false"
                  aria-haspopup="menu"
                  aria-label="More"
                  data-title="More"
                  className={styles.options}
                >
                  <DotIcon />
                </button>
              )}
              {session && (
                <button
                  aria-label="Message"
                  data-title="Message"
                  className={styles.message}
                >
                  <MessageIcon />
                </button>
              )}
              {session && (
                <button
                  aria-label="Turn on Tweet notifications"
                  data-title="Notify"
                  className={styles.notifications}
                >
                  <ReceiveNotificationsIcon />
                </button>
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

      {isEditProfileModalOpen && <EditProfileModal user={user} />}
      {isInspectModalOpen && <InspectImageModal />}
    </div>
  );
};
