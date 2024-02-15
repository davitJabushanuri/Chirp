import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { Button } from "@/components/elements/button";
import { TextInput } from "@/components/elements/text-input";
import { Tooltip } from "@/components/elements/tooltip";

import { updateProfile } from "../api/update-profile";
import { CameraIcon } from "../assets/camera-icon";
import { IProfile, IUser } from "../types";

import styles from "./styles/edit-profile-modal.module.scss";

export const EditProfileModal = ({
  user,
  closeModal,
}: {
  user: IUser;
  closeModal: () => void;
}) => {
  const innerWidth = window.innerWidth;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      profile,
      userId,
    }: {
      profile: IProfile;
      userId: string;
    }) => {
      return updateProfile(profile, userId);
    },

    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["users", user?.id] });
    },
  });

  const [profile, setProfile] = useState<IProfile>({
    name: user?.name || "",
    bio: user?.description || "",
    location: user?.location || "",
    website: user?.url || "",
    banner: {
      url: user?.profile_banner_url || "",
      file: undefined,
    },
    avatar: { url: user?.profile_image_url || "", file: undefined },
  });

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const chooseImage = async (event: any, type: string) => {
    const file = event.target.files[0];
    if (!file) return;

    if (type === "banner" && bannerInputRef.current)
      bannerInputRef.current.value = "";

    if (type === "avatar" && avatarInputRef.current)
      avatarInputRef.current.value = "";

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile({
        ...profile,
        [type]: { url: reader.result as string, file },
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.2 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <Tooltip text="Back">
          <Button
            aria-label={innerWidth <= 700 ? "Back" : "Close"}
            onClick={() => {
              closeModal();
            }}
            className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
          >
            {innerWidth <= 700 ? <BackArrowIcon /> : <CloseIcon />}
          </Button>
        </Tooltip>

        <h2>Edit Profile</h2>

        <button
          aria-label="Save"
          onClick={() => mutation.mutate({ profile, userId: user.id })}
          disabled={profile?.name.length === 0}
          className={styles.save}
        >
          Save
        </button>
      </div>

      <div className={styles.banner}>
        {profile?.banner?.url && (
          <Image
            src={profile?.banner?.url}
            alt="banner"
            width={500}
            height={500}
          />
        )}

        <input
          accept="image/jpeg,image/png,image/webp"
          tabIndex={-1}
          className={styles.bannerInput}
          type="file"
          ref={bannerInputRef}
          onChange={(e) => chooseImage(e, "banner")}
        />
        <div className={styles.actions}>
          <Tooltip text="Add photo">
            <Button
              aria-label="Add banner photo"
              onClick={() => {
                bannerInputRef.current?.click();
              }}
              className="bg-black-300/40 hover:bg-black-300/50 focus-visible:bg-black-300/50 focus-visible:outline-secondary-100 active:bg-black-300/60"
            >
              <CameraIcon />
            </Button>
          </Tooltip>

          {profile?.banner?.url && (
            <Tooltip text="Remove photo">
              <Button
                aria-label="Remove banner photo"
                onClick={() => {
                  setProfile({
                    ...profile,
                    banner: { url: "", file: undefined },
                  });
                }}
                className="bg-black-300/40 hover:bg-black-300/50 focus-visible:bg-black-300/50 focus-visible:outline-secondary-100 active:bg-black-300/60"
              >
                <CloseIcon />
              </Button>
            </Tooltip>
          )}
        </div>
      </div>

      <div className={styles.avatar}>
        <Image
          src={
            profile?.avatar?.file
              ? (profile?.avatar?.url as string)
              : user?.profile_image_url
                ? user?.profile_image_url
                : `/user_placeholder.png`
          }
          alt="avatar"
          width={500}
          height={500}
        />

        <input
          className={styles.avatarInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          tabIndex={-1}
          ref={avatarInputRef}
          onChange={(e) => chooseImage(e, "avatar")}
        />
        <div className={styles.chooseAvatar}>
          <Tooltip text="Add photo">
            <Button
              aria-label="Add avatar photo"
              onClick={() => {
                avatarInputRef.current?.click();
              }}
              className="bg-black-300/40 hover:bg-black-300/50 focus-visible:bg-black-300/50 focus-visible:outline-secondary-100 active:bg-black-300/60"
            >
              <CameraIcon />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className={styles.form}>
        <TextInput
          id="name"
          name="name"
          onChange={(e) => {
            setProfile((prev: IProfile) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
          placeholder="Name"
          value={profile.name}
          maxLength={50}
          isError={profile?.name.length === 0}
          errorMessage="Name can't be blank"
        />

        <TextInput
          id="bio"
          name="bio"
          placeholder="Bio"
          value={profile.bio || ""}
          onChange={(e) => {
            setProfile((prev: IProfile) => ({
              ...prev,
              bio: e.target.value,
            }));
          }}
          maxLength={160}
        />

        <TextInput
          id="location"
          name="location"
          placeholder="Location"
          value={profile.location || ""}
          onChange={(e) => {
            setProfile((prev: IProfile) => ({
              ...prev,
              location: e.target.value,
            }));
          }}
          maxLength={30}
        />

        <TextInput
          id="website"
          name="website"
          placeholder="Website"
          value={profile.website || ""}
          onChange={(e) => {
            setProfile((prev: IProfile) => ({
              ...prev,
              website: e.target.value,
            }));
          }}
          maxLength={100}
        />
      </div>
    </motion.div>
  );
};
