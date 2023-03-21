/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { DotIcon } from "@/assets/dot-icon";
import { LocationIcon } from "@/assets/location-icon";
import { MessageIcon } from "@/assets/message-icon";
import { ReceiveNotificationsIcon } from "@/assets/notifications-icon";
import { FollowButton } from "@/components/elements/follow-button";
import { useEditProfile } from "@/stores/use-edit-profile";
import { useInspectImage } from "@/stores/use-inspect-profile-image";

import { WebsiteIcon } from "../assets/website-icon";
import { IUser } from "../types";

import styles from "./styles/user-info.module.scss";
import { UserJoinDate } from "./user-join-date";

export const UserInfo = ({ user }: { user: IUser }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  const isFollowing = user?.followers?.some(
    (follower) => follower?.follower_id === session?.user?.id,
  );
  const openEditProfileModal = useEditProfile(
    (state) => state.openEditProfileModal,
  );

  const openInspectModal = useInspectImage((state) => state.openInspectModal);
  const setSource = useInspectImage((state) => state.setSource);
  const setSourceType = useInspectImage((state) => state.setSourceType);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        {user?.profile_banner_url && (
          <Image
            onClick={() => {
              setSource(user?.profile_banner_url || "");
              setSourceType("banner");
              openInspectModal();
            }}
            src={user?.profile_banner_url}
            alt="banner"
            width={500}
            height={500}
          />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.avatar}>
          {user?.profile_image_url ? (
            <Image
              onClick={() => {
                setSource(user?.profile_image_url || "");
                setSourceType("avatar");
                openInspectModal();
              }}
              src={user?.profile_image_url}
              alt="avatar"
              width={100}
              height={100}
            />
          ) : (
            <Image
              src="/user_placeholder.png"
              alt=""
              width={100}
              height={100}
            />
          )}
        </div>

        <div className={styles.editProfile}>
          {session?.user?.id === user?.id ? (
            <button
              onClick={() => openEditProfileModal()}
              className={styles.editProfile}
            >
              Edit Profile
            </button>
          ) : (
            <div className={styles.visitorActions}>
              {session && (
                <button className={styles.options}>
                  <DotIcon />
                </button>
              )}
              {session && (
                <button className={styles.message}>
                  <MessageIcon />
                </button>
              )}
              {session && (
                <button className={styles.notifications}>
                  <ReceiveNotificationsIcon />
                </button>
              )}

              <FollowButton
                followerId={session?.user?.id}
                userId={user?.id}
                isFollowing={isFollowing}
                username={user?.email?.split("@")[0]}
              />
            </div>
          )}
        </div>

        <div className={styles.user}>
          <div className={styles.name}>
            <h1>{user?.name}</h1>
            <p>@{user?.username ?? user?.email?.split("@")[0]}</p>
          </div>

          {user?.description && (
            <div className={styles.bio}>
              <p>{user?.description}</p>
            </div>
          )}

          <div className={styles.locationAndJoined}>
            {user?.location && (
              <div className={styles.location}>
                <span className={styles.icon}>
                  <LocationIcon />
                </span>
                <span className={styles.text}>{user?.location}</span>
              </div>
            )}

            {user?.url && (
              <div className={styles.website}>
                <span className={styles.icon}>
                  <WebsiteIcon />
                </span>
                <span className={styles.text}>
                  <a href={user?.url}>{user?.url}</a>
                </span>
              </div>
            )}

            {user?.created_at && <UserJoinDate date={user?.created_at} />}
          </div>

          <div className={styles.stats}>
            <button
              onClick={() => router.push(`${id}/following`)}
              className={styles.stat}
            >
              <span className={styles.number}>{user?.following?.length}</span>
              <span className={styles.text}>Following</span>
            </button>
            <button
              onClick={() => router.push(`${id}/followers`)}
              className={styles.stat}
            >
              <span className={styles.number}>{user?.followers?.length}</span>
              <span className={styles.text}>Followers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
