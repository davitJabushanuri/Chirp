"use client";

import { IUser, Profile, ProfileMedia } from "@/features/profile";

export const MediaClientPage = ({ user }: { user: IUser }) => {
  return (
    <div>
      <Profile user={user} />
      <ProfileMedia />
    </div>
  );
};
