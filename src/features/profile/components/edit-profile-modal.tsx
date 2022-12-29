/* eslint-disable @next/next/no-img-element */

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { useEditProfile } from "@/stores/useEditProfile";

import { CameraIcon } from "../assets/camera-icon";
import { IUser } from "../types";

import styles from "./styles/edit-profile-modal.module.scss";

export const EditProfileModal = ({ user }: { user: IUser }) => {
  const closeEditProfileModal = useEditProfile(
    (state) => state.closeEditProfileModal,
  );

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

          <button className={styles.save}>Save</button>
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
      </div>
    </div>
  );
};
