"use client";
import { IUser, Profile, ProfileTweetsAndReplies } from "@/features/profile";

export const WithRepliesClientPage = ({ user }: { user: IUser }) => {
  return (
    <div>
      <Profile user={user} />
      <ProfileTweetsAndReplies />
    </div>
  );
};
