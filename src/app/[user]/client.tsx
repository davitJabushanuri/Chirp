"use client";

import { IUser, Profile, ProfileTweets } from "@/features/profile";

export const ClientUserPage = ({ user }: { user: IUser }) => {
  return (
    <>
      <Profile user={user} />
      <ProfileTweets />
    </>
  );
};
