/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { useEditProfile } from "@/stores/useEditProfile";

import { updateProfile } from "../api/update-profile";
import { CameraIcon } from "../assets/camera-icon";
import { IProfile, IUser } from "../types";

import styles from "./styles/edit-profile-modal.module.scss";

export const EditProfileModal = ({ user }: { user: IUser }) => {
  const closeEditProfileModal = useEditProfile(
    (state) => state.closeEditProfileModal,
  );

  const [profile, setProfile] = useState<IProfile>({
    name: user?.name || "",
    bio: user?.description || "",
    location: user?.location || "",
    website: user?.url || "",
    banner: user?.profile_banner_url || "",
    avatar: user?.profile_image_url || "",
  });

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button
            onClick={() => closeEditProfileModal()}
            className={styles.close}
          >
            <span className={styles.arrow}>
              <BackArrowIcon />
            </span>
            <span className={styles.x}>
              <CloseIcon />
            </span>
          </button>

          <h2>Edit Profile</h2>

          <button
            onClick={() => updateProfile(profile, user?.id)}
            disabled={profile?.name.length === 0}
            className={styles.save}
          >
            Save
          </button>
        </div>

        <div className={styles.banner}>
          {user?.profile_banner_url && (
            <img src={user.profile_banner_url} alt="banner" />
          )}

          <button className={styles.chooseBanner}>
            <CameraIcon />
          </button>
        </div>

        <div className={styles.avatar}>
          {user?.profile_image_url ? (
            <img src={user.profile_image_url} alt="avatar" />
          ) : (
            <img src="/user_placeholder.png" alt="" />
          )}
          <button className={styles.chooseAvatar}>
            <CameraIcon />
          </button>
        </div>

        <div className={styles.form}>
          <Input label="name" value={profile.name} setProfile={setProfile} />
          <Input label="bio" value={profile.bio} setProfile={setProfile} />
          <Input
            label="location"
            value={profile.location}
            setProfile={setProfile}
          />
          <Input
            label="website"
            value={profile.website}
            setProfile={setProfile}
          />
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  value,
  setProfile,
}: {
  label: string;
  value: string | undefined;
  setProfile: (value: string | any) => void;
}) => {
  return (
    <div className={styles.input}>
      <label
        htmlFor={label}
        className={
          label === "name" && value?.length === 0 ? styles.isError : ""
        }
      >
        <input
          type="text"
          name={label}
          id={label}
          placeholder="Name"
          value={value}
          onChange={(e) =>
            setProfile((prev: IProfile) => ({
              ...prev,
              [label]: e.target.value,
            }))
          }
        />
        <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
      </label>
      {label === "name" && value?.length === 0 && (
        <span className={styles.error}>Name can&apos;t be blank</span>
      )}
    </div>
  );
};
