"use client";

import { IUser, Profile, ProfileLikes } from "@/features/profile";

export const LikesCLientPage = ({ user }: { user: IUser }) => {
  return (
    <div>
      <Profile user={user} />
      <ProfileLikes />
    </div>
  );
};
