/* eslint-disable @next/next/no-img-element */
"use client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";

import { LocationIcon } from "@/assets/location-icon";
import { LoadingSpinner } from "@/components/elements/loading-spinner";

import getUser from "../api/get-user";
import { CalendarIcon } from "../assets/calendar-icon";
import { IUser } from "../types";

import styles from "./styles/user-info.module.scss";

export const UserInfo = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[2] || "";

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<IUser | null>(["user", id], () => getUser(id));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        {user?.profile_banner_url && (
          <img src={user?.profile_banner_url} alt="" />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <img src={user?.profile_image_url || user?.image} alt="" />
        </div>

        <div className={styles.editProfile}>
          <button>Edit Profile</button>
        </div>

        <div className={styles.user}>
          <div className={styles.name}>
            <h1>{user?.name}</h1>
            <p>@{user?.username ?? user?.email.split("@")[0]}</p>
          </div>

          {user?.description && (
            <div className={styles.bio}>
              <p>{user?.description}</p>
            </div>
          )}

          <div className={styles.locationAndJoined}>
            {!user?.location && (
              <div className={styles.location}>
                <span className={styles.icon}>
                  <LocationIcon />
                </span>
                <span className={styles.text}>{user?.location}georgia</span>
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
