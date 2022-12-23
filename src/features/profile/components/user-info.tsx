/* eslint-disable @next/next/no-img-element */
"use client";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

import { DotIcon } from "@/assets/dot-icon";
import { LocationIcon } from "@/assets/location-icon";

import { updateProfile } from "../api/update-profile";
import { CalendarIcon } from "../assets/calendar-icon";
import { IUser } from "../types";

import styles from "./styles/user-info.module.scss";

export const UserInfo = ({ user }: { user: IUser }) => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        {user?.profile_banner_url && (
          <img src={user?.profile_banner_url} alt="" />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.avatar}>
          {user?.profile_image_url ? (
            <img src={user?.profile_image_url} alt="" />
          ) : (
            <img src="/user_placeholder.png" alt="" />
          )}
        </div>

        <div className={styles.editProfile}>
          {session?.user?.id === user?.id ? (
            <button
              onClick={() => updateProfile(user.id)}
              className={styles.editProfile}
            >
              Edit Profile
            </button>
          ) : (
            <div className={styles.visitorActions}>
              <button className={styles.options}>
                <DotIcon />
              </button>
              <button className={styles.message}>message</button>
              <button className={styles.notifications}>notifications</button>
              <button className={styles.follow}>Follow</button>
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

            {user?.created_at && (
              <div className={styles.joined}>
                <span className={styles.icon}>
                  <CalendarIcon />
                </span>
                <span className={styles.text}>
                  Joined {dayjs(user?.created_at).format("MMMM YYYY")}
                </span>
              </div>
            )}
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.number}>{user?.friends_count}</span>
              <span className={styles.text}>Following</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}>{user?.followers_count}</span>
              <span className={styles.text}>Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
